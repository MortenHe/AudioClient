//Audio-Ordner umbenennen fuer Audio-Player

//Zugriff auf Dateisystem
const fs = require('fs-extra');

//Wo liegen die Ordner, die umbenannt werden sollen?
const mediaDir = require("./config.js").mediaDir + "/pw/audio";

//Ueber ueber filter-dirs des aktuellen modes gehen (hsp, kindermusik,...)
fs.readdirSync(mediaDir).forEach(folder => {
    const oldFolder = mediaDir + "/" + folder;

    //Wenn es ein Ordner ist
    const stat = fs.statSync(oldFolder);
    if (stat && stat.isDirectory()) {

        //15 - Der rote Hahn -> 15 - der rote hahn
        let newName = folder.toLowerCase();

        //15 - der rote hahn -> 15-der rote hahn
        newName = newName.replace(/ - /g, '-');

        //15-der rote hahn -> 15-der-rote-hahn
        newName = newName.replace(/ /g, '-');

        //Umlaute aendern
        newName = newName.replace(/ä/g, 'ae');
        newName = newName.replace(/ö/g, 'oe');
        newName = newName.replace(/ü/g, 'ue');
        newName = newName.replace(/ß/g, 'ss');

        //Ordner umbenennen
        fs.renameSync(oldFolder, mediaDir + "/" + newName);
    }
});