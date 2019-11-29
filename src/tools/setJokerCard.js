//Jokerkarte auf neue Playlist setzen und geaenderte Files auf Server laden
//node .\setJokerCard.js laila 16-knuddel (=Lailas Jokerkarte auf HSP "Alle lieben Knuddel" setzen und auf Server Laila laden)
//node .\setJokerCard.js luis 12-rad (=Luis' Jokerkarte auf HSP "Max feahrt Rad" setzen und auf Server Luis laden)
//node .\setJokerCard.js luis 12-rad vb (=Luis' Jokerkarte auf HSP "Max feahrt Rad" setzen und auf Server vb laden)

//JokerIDs
const jokerIDs = {
    "laila": "1234567890",
    "luis": "0987654321"
}

//Wessen Jokerkarte soll geandert werden?
const appId = process.argv[2];
const jokerID = jokerIDs[appId];

//Welche Playlist soll verknuepft werden?
const newJokerFolder = process.argv[3];

//Auf welchen Server sollen die geanderten Dateien gespielt werden?
const targetMachine = process.argv[4] || appId;

//Abbruch bei fehlerhaften Parametern
if (!jokerID || !newJokerFolder) {
    console.error("Parameter nicht korrekt");
    process.exit();
}

//Dort liegen / dorthin kommen die Dateien
const connection = require("./connection.js");
const localAssetDir = __dirname + "/../assets/json/" + connection[appId].assetId;
const remoteAssetDir = "/var/www/html/wap/assets/json/" + connection[appId].assetId;

//Libs laden
const findInFiles = require('find-in-files');
const Client = require('ssh2-sftp-client');
const fs = require('fs-extra');
const path = require("path");
const { JSONPath } = require('jsonpath-plus');

//Geanderte Dateien sammeln, die 
const editedFilesToUpload = new Set();

//Async Methode fuer Await Aufrufe
async function main() {

    //Ermitteln welche neue Playlist verknupeft werden soll
    const matchedFilesForNewFolder = await findInFiles.findSync('"' + newJokerFolder + '"', localAssetDir);

    //Wenn es keine neue Playlist gibt -> Abbruch
    if (!Object.keys(matchedFilesForNewFolder).length) {
        console.error("no new folder found");
        process.exit();
    }

    //JSON-File ermitteln, in der die Joker-RFID derzeit gesetzt ist und dort zuruecksetzen
    const matchedFilesForCurrentRFID = await findInFiles.findSync('"' + jokerID + '"', localAssetDir);
    for (const matchedFile in matchedFilesForCurrentRFID) {

        //Datei wird geaendert uns daher spaeter hochgeladen werden
        editedFilesToUpload.add(matchedFile);

        //Inhalt der zu aenderden Datei oeffnen, den Eintrag finden, bei dem die RFID gesetzt ist und diese zuruecksetzen
        let json = fs.readJSONSync(matchedFile);
        let result = JSONPath({ path: '$..[?(@.rfid=="' + jokerID + '")]', json });
        console.log("reset " + appId + " joker " + jokerID + " for folder " + result[0].file + " in file " + path.basename(matchedFile));
        result[0].rfid = "";

        //Geanderte Datei speichern (mit passender Formattierung)
        fs.writeJSONSync(matchedFile, json, {
            spaces: 4
        });
    }

    //RFID bei Playlist in ermitteltem JSON-File setzen
    for (const matchedFile in matchedFilesForNewFolder) {

        //Datei wird geaendert uns daher spaeter hochgeladen werden
        editedFilesToUpload.add(matchedFile);

        //Inhalt der zu aenderden Datei oeffnen, den Eintrag finden, bei dem die RFID gesetzt werden soll
        let json = fs.readJSONSync(matchedFile);
        let result = JSONPath({ path: '$..[?(@.file=="' + newJokerFolder + '")]', json });

        //Wenn bei diesem Eintrag bereits eine (nichtleere) RFID gesetzt ist -> Abbruch, damit keine "echte" Karte ueberschrieben wird
        if (result[0].rfid && result[0].rfid !== "") {
            console.error("folder " + result[0].file + " in file " + path.basename(matchedFile) + " already has a rfid code");
            process.exit();
        }

        //Joker-RFID fuer neue Playlist setzen
        console.log("set " + appId + " joker " + jokerID + " for folder " + newJokerFolder + " in file " + path.basename(matchedFile));
        result[0].rfid = jokerID;

        //Geanderte Datei speichern (mit passender Formattierung)
        fs.writeJSONSync(matchedFile, json, {
            spaces: 4
        });
    }

    //sftp-Verbindung um files hochzuladen
    console.log("connect sftp to server " + targetMachine + ": " + connection[targetMachine].host);
    const sftp = new Client();
    await sftp.connect({
        host: connection[targetMachine].host,
        port: '22',
        username: connection[targetMachine].user,
        password: connection[targetMachine].password
    });

    //Ueber geanderte Dateien gehen und diese hochladen
    for (const fileToUpload of editedFilesToUpload) {
        const remotePath = remoteAssetDir + "/" + path.basename(path.dirname(fileToUpload)) + "/" + path.basename(fileToUpload);
        console.log("upload updated file " + path.basename(fileToUpload) + " to remote path " + remotePath);
        await sftp.fastPut(fileToUpload, remotePath);
    }

    //SFTP und Programm beenden
    console.log("upload done");
    await sftp.end();
    process.exit();
}
main();