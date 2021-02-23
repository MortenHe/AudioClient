//Audio-Ordner umbenennen fuer Audio-Player

//Zugriff auf Dateisystem
const fs = require('fs-extra');
const slugify = require('slugify')

//Wo liegen die Ordner, die umbenannt werden sollen?
const mediaDir = fs.readJsonSync("config.json").createAudioDir;

//Ueber ueber filter-dirs des aktuellen modes gehen (hsp, kindermusik,...)
fs.readdirSync(mediaDir).forEach(folder => {
    const oldFolder = mediaDir + "/" + folder;

    //Wenn es ein Ordner ist
    const stat = fs.statSync(oldFolder);
    if (stat && stat.isDirectory()) {

        //Slug erstellen: 15 - Der rote Hahn -> 15-der-rote-hahn
        const newName = slugify(folder, {
            lower: true,
            locale: 'de'
        });

        //Ordner umbenennen
        fs.renameSync(oldFolder, mediaDir + "/" + newName);
    }
});