//Connection laden
const connection = require("./connection.js");

//Wohin sollen die Daten deployed werden (vb vs. pi)? wenn kein Argument kommt -> pi
const runMode = process.argv[2] ? process.argv[2] : "pi";

//Welches Projekt audio vs. video soll deployed werden? Wenn kein Argument kommt -> audio
let appMode = process.argv[3] ? process.argv[3] : "audio";
console.log("build and deploy " + appMode + " to " + runMode);

//Unter welchem Unterpfad wird die App auf dem Server laufen?
let base_href = appMode === "audio" ? "wap" : "wvp";

//davon ausgehen, dass fuer pi gebaut wird
let production = "prod";

//Bei Virtualbox
if (runMode === "vb") {

    //Andere configuration
    production = "dev";
}

//Projekt bauen
const { execSync } = require('child_process');
console.log("start build");
execSync("ng build --configuration=" + appMode + "-" + production + " --base-href=/" + base_href + "/ --prod");
console.log("build done");

//htacces Schablone in dist Ordner kopieren
const fs = require('fs-extra');
console.log("copy htacces");
fs.copySync('.htaccess', '../../dist/htaccess');

//htacces Schablone anpassen durch Pattern Ersetzung
var replace = require("replace");
console.log("update htacces");
replace({
    regex: "###PATH###",
    replacement: base_href,
    paths: ['../../dist/htaccess'],
    recursive: true,
    silent: true
});

//Bei Audio
console.log("remove unused json");
if (appMode === "audio") {

    //wird Video json nicht benoetigt
    fs.removeSync('../../dist/assets/json/video');
}

//bei Video
else {

    //wird Audio json nicht benoetigt
    fs.removeSync('../../dist/assets/json/audio');
}

//Dist-Folder zippen
var zipFolder = require('zip-folder');
console.log("zip data");
zipFolder('../../dist', '../../myDist.zip', function (err) { });

//gezippte Daten per SSH auf Server spielen und entpacken
var SSH2Promise = require('ssh2-promise');
var ssh = new SSH2Promise({
    host: connection[runMode].host,
    username: connection[runMode].user,
    password: connection[runMode].password
});

//SSH Session erzeugen
ssh.connect().then(() => {

    //SFT Session erzeugen
    ssh.sftp().then((sftp) => {

        //wap/wvp Ordner loeschen
        console.log("remove old remote dir");
        ssh.exec("rm -fr /var/www/html/" + base_href).then((data) => {

            //wap/wvp Ordner anlegen
            console.log("create new remote dir")
            sftp.mkdir("/var/www/html/" + base_href, function () {

                //ZIP-Datei hochladen
                console.log("upload zipped data");
                sftp.fastPut("../../myDist.zip", "/var/www/html/" + base_href + "/myDist.zip", function (data) {

                    //ZIP-Datei entpacken
                    console.log("unzip remote data");
                    ssh.exec("cd /var/www/html/" + base_href + " && unzip myDist.zip").then((data) => {

                        //htaccess Datei umbenennen
                        console.log("rename htaccess");
                        ssh.exec("mv /var/www/html/" + base_href + "/htaccess /var/www/html/" + base_href + "/.htaccess").then(function (data) {

                            //ZIP-Datei loeschen
                            console.log("delete remote zip file");
                            sftp.unlink("/var/www/html/" + base_href + "/myDist.zip", function (data) {

                                //Rechte anpassen, damit Apache files lesen kann
                                console.log("grant permission");
                                ssh.exec("chmod -R 0777 /var/www/html").then((data) => {

                                    //Programm beenden
                                    console.log("build process done");
                                    process.exit();
                                })
                            });
                        });
                    });
                });
            });
        });
    });
});