//node .\compareLocalJsonWithServer.js pw pw (= PW Assets mit PW Pi vergleichen)
//node .\compareLocalJsonWithServer.js marlen vb (= Marlen Assets mit VB vergleichen)
//node .\compareLocalJsonWithServer.js laila laila (= PW Assets mit Laila Player vergleichen)

//Connection laden
const connection = require("./connection.js");

//welche assets (pw vs. marlen) vergleichen auf welcher Maschine (pw / marlen / vb) 
const appId = process.argv[2] || "pw";
const targetMachine = process.argv[3] || "pw";
console.log("compare local audio files (" + appId + ") with server " + targetMachine + ":" + connection[targetMachine].host);

//Pfade wo die Dateien liegen auf Server
const audioPath = "/media/usb_audio/audio";

//libraries laden fuer Dateizugriff
const fs = require('fs-extra')
const path = require('path');

//lokale Items (z.B. Audio-Ordner) sammeln
itemsLocal = [];

//versch. environments koennen gemeinsame assets nutzen
assetsId = connection[appId].assetId;
console.log("use assets " + assetsId);

//Ueber ueber filter-dirs des aktuellen modes gehen (hsp, kindermusik,...)
fs.readdirSync("../assets/json/" + assetsId).forEach(folder => {

    //Wenn es ein dir ist
    if (fs.lstatSync("../assets/json/" + assetsId + "/" + folder).isDirectory()) {

        //JSON-Files in diesem Dir auslesen
        fs.readdirSync("../assets/json/" + assetsId + "/" + folder).forEach(file => {

            //modus in Variable speichern (bobo.json -> bobo)
            let mode = path.basename(file, ".json");

            //JSON-File einlesen
            const json = fs.readJsonSync("../assets/json/" + assetsId + "/" + folder + "/" + file);

            //Ueber items (= Folgen) des JSON files gehen
            json.forEach(function (item) {

                //Pfad erstellen und merken .../hsp/bibi-tina/01-fohlen
                itemsLocal.push(audioPath + "/" + folder + "/" + mode + "/" + item.file)
            });
        });
    }
});

//SSH Verbindung aufbauen
var SSH2Promise = require('ssh2-promise');
var ssh = new SSH2Promise({
    host: connection[targetMachine].host,
    username: connection[targetMachine].user,
    password: connection[targetMachine].password
});

//SSH Session erzeugen
ssh.connect().then(() => {

    //Folder auf Server liefern
    ssh.exec("find " + audioPath + " -mindepth 3 -maxdepth 3 -type d").then((data) => {

        //Listen-String trimmen und Array erzeugen (Zeilenumbruch als Trenner)
        const itemsRemote = data.trim().split("\n");

        //Sets erzeugen fuer Vergleich der Werte
        const a = new Set(itemsRemote);
        const b = new Set(itemsLocal);

        //Welche Werte sind bei Server aber nicht in Config?
        const missingConfig = new Set([...a].filter(x => !b.has(x)));

        //Welche Werte sind in Config auf nicht auf Server?
        const missingServer = new Set([...b].filter(x => !a.has(x)));

        //Fehlende Werte in Config ausgeben
        for (const entry of missingConfig.entries()) {
            console.log("missing in config: " + entry[0].replace(audioPath + "/", ""));
        }

        //Fehlende Werte auf Server ausgeben
        for (const entry of missingServer.entries()) {
            console.log("missing on server: " + entry[0].replace(audioPath + "/", ""));
        }

        //Skript beenden
        process.exit();
    });
});