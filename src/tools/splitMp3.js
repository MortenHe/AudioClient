//https://wiki.librivox.org/index.php/How_To_Split_With_Mp3Splt
//mp3splt muss im PATH vorhanden sein

//Libs
const glob = require("glob");
const path = require("path");
const fs = require("fs-extra");
const inquirer = require('inquirer');
const execSync = require('child_process').execSync;

//Wo liegt die Datei fuer den Split
const splitDir = fs.readJSONSync("config.json").splitDir;

//SPLITDIR/15 - Der rote Hahn.mp3
const file = glob.sync(splitDir + "/*.mp3")[0];

//15 - Der rote Hahn
const filename = path.basename(file, ".mp3");

//15 - Der rote Hahn -> 15 - der rote hahn
let newFilename = filename.toLowerCase();

//15 - der rote hahn -> 15-der rote hahn
newFilename = newFilename.replace(/ - /g, '-');

//15-der rote hahn -> 15-der-rote-hahn
newFilename = newFilename.replace(/ /g, '-');

//Umlaute aendern
newFilename = newFilename.replace(/ä/g, 'ae');
newFilename = newFilename.replace(/ö/g, 'oe');
newFilename = newFilename.replace(/ü/g, 'ue');
newFilename = newFilename.replace(/ß/g, 'ss');

//Ordner SPLITDIR/15-der-rote-hahn entfernen (falls z.B. vorher schon splits mit anderer Traecklaenge erzeugt wurden)
fs.removeSync(splitDir + "/" + newFilename);

//15-der-rote-hahn.mp3 anlegen, damit CLI-Skript Datei lesen kann
const newFile = newFilename + ".mp3";
const newFilePath = splitDir + "/" + newFile;
fs.copySync(file, newFilePath);

//Label fuer nummerierte Benennung: 15 - Der rote Hahn -> Der rote Hahn
const label = filename.replace(/\d{2} - /, '');

//Prompt fuer
//Dateiname "Der rote Hahn" fuer nummerierte Einzeltracks (01 - Der rote Hahn [1].mp3)
//durchschn. Tracklaenge
const questions = [{
    type: 'input',
    name: 'label',
    message: 'Dateiname',
    default: label
}, {
    type: 'number',
    name: 'trackLength',
    message: 'Tracklänge',
    default: 7
}];
inquirer.prompt(questions)
    .then(answers => {

        //Datei splitten und Einzeltracks in Unterordner 15-der-rote-hahn ablegen
        $command = "cd " + splitDir + " && mp3splt -f -t " + answers.trackLength + ".0 -a -d " + newFilename + " " + newFile;
        execSync($command, { stdio: 'inherit' });

        //Dateien in Unterordner mit Nummerierung umbenennen
        counter = 1;
        const mp3Files = fs.readdirSync(splitDir + "/" + newFilename);
        for (const oldFilename of mp3Files) {

            //01 - Der rote Hahn [1].mp3
            const numberedFilename = "0" + counter + " - " + answers.label + " [" + counter + "].mp3";

            //15-der-rote-hahn/15-der-rote-hahn/15-der-rote-hahn_00m_00s__07m_00s.mp3 -> 15-der-rote-hahn/01 - Der rote Hahn [1].mp3
            const oldFilePath = splitDir + "/" + newFilename + "/" + oldFilename;
            const newFilePath = splitDir + "/" + newFilename + "/" + numberedFilename;
            fs.renameSync(oldFilePath, newFilePath);
            counter++;
        }

        //Fuer Splitskript umbenannte Datei 15-der-rote-hahn.mp3 loeschen
        fs.removeSync(newFilePath);
    });