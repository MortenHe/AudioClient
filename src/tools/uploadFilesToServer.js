//Audiodateien auf Server uebertragen
//node .\uploadFilesToServer.js pw (= Dateien auf PW Pi laden)
//node .\uploadFilesToServer.js vb (= Dateien auf VB laden)
//node .\uploadFilesToServer.js laila (= Dateien auf Lailas Player laden)

//Connection laden
const connection = require("./connection.js");

//Woher und wohin  files hochgeladen?
const targetMachine = process.argv[2] || "pw";

//Dort liegen / dorthin kommen die Dateien
const localAudioDir = require("./config.js").mediaDir + "/" + targetMachine + "/audio";
const remoteAudioDir = "/media/usb_audio/audio";

console.log("upload audio files from " + localAudioDir);
console.log("upload to server " + targetMachine + ": " + connection[targetMachine].host);

//Libs laden
const Client = require('ssh2-sftp-client');
const fs = require('fs-extra');
const glob = require("glob");
const path = require("path");

//Async Methode fuer Await Aufrufe
async function main() {

    //Ermitteln wohin der Audio Ordner hochgeladen werden sollen, dazu ueber alle JSON-Configs gehen (janosch.json, bibi.json, rz.json,...)
    console.log("get file infos from local json");
    const albumList = {};

    //JSON Assets dieser App durchgehen
    const files = glob.sync("../../src/assets/json/" + connection[targetMachine].assetId + "/*/*.json")
    for (const file of files) {

        //Ordner ermitteln wohin Dateien dieses Modes kommen: hsp/bibi-tina
        const folder = path.basename(path.dirname(file));
        const subfolder = path.basename(file, '.json');

        //Ueber Eintraege eines Modes gehen (z.B. bibi-tina.json) und Pfadinfo sammeln: "15-rote-hahn" liegt unter "hsp/bibi-tina"
        const json = await fs.readJSON(file);
        for (album of json) {
            albumList[album.file] = folder + "/" + subfolder;
        }
    };

    //sftp-Verbindung um files hochzuladen
    console.log("connect sftp");
    const sftp = new Client();
    await sftp.connect({
        host: connection[targetMachine].host,
        port: '22',
        username: connection[targetMachine].user,
        password: connection[targetMachine].password
    });

    //Lokale Ordner ermitteln, die hochgeladen werden sollen
    console.log("get local folders to upload")
    const localFolders = await fs.readdir(localAudioDir);
    const filePromises = [];
    for (const localFolderName of localFolders) {
        const localAudioFolder = localAudioDir + "/" + localFolderName;
        if (fs.statSync(localAudioFolder).isDirectory()) {

            //Dateien dieses Ordners einzeln hochladen
            const $readAudioDir = fs.readdir(localAudioFolder);

            //Wo sollen die Dateien auf Server liegen? Verzichnis ggf. loeschen und neu anlegen (damit es leer ist)
            const remoteAudioPath = remoteAudioDir + "/" + albumList[localFolderName] + "/" + localFolderName;
            const dir_exists = await sftp.exists(remoteAudioPath);
            if (dir_exists) {
                console.log("delete remote folder " + remoteAudioPath);
                await sftp.rmdir(remoteAudioPath, true);
            }

            //Remote folder anlegen
            console.log("create remote folder " + remoteAudioPath);
            const $makeRemoteDir = sftp.mkdir(remoteAudioPath, true);

            //Warten bis remote-Ordner angelegt wurde und lokale Dateien gelesen wurden
            const folderPromises = await Promise.all([$makeRemoteDir, $readAudioDir]);

            //Ueber einzelne Dateien gehen und hochladen
            const filesToUpload = folderPromises[1];
            for (file of filesToUpload) {

                //Nur mp3-Dateien hochladen
                if (path.extname(file).toLowerCase() === ".mp3") {

                    //Jeder Upload als Promise, damit mehrere Uploads gleichzeitig laufen koennen
                    console.log("upload " + file + " to " + remoteAudioPath);
                    filePromises.push(sftp.fastPut(localAudioFolder + "/" + file, remoteAudioPath + "/" + file));
                }

                //andere Dateiformate ignorieren
                else {
                    console.log("ignore " + file);
                }
            }
        }
    }

    //Warten bis alle Promises erfuellt sind (=alle Dateien hochgeladen wurden)
    await Promise.all(filePromises);

    //SFTP und Programm beenden
    console.log("upload done");
    await sftp.end();
    process.exit();
}

//Upload starten
main();