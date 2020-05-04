//Ordner ermitteln, die noch keine RFID gesetzt haben
const fs = require('fs-extra');
const glob = require("glob");

//Ordner ohne RFID sammeln
foldersWithoutRFID = [];

//JSON Assets durchgehen
const files = glob.sync(require("./config.js").jsonDir + "/*/*.json")
for (const file of files) {

    //Ueber Eintraege eines Modes gehen und Eintraege ohne RFID sammeln
    const json = fs.readJSONSync(file);
    for (album of json) {
        if (!album.rfid) {
            foldersWithoutRFID.push(album.name);
        }
    }
}

//Trefferliste sortieren und ausgeben
foldersWithoutRFID.sort();
console.log(foldersWithoutRFID.length + " folders without rfid");
console.log(foldersWithoutRFID);