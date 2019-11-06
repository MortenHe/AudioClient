//Nur JSON-Config auf Server uebertragen
//node .\deployJsonToServer.js pw (= Dateien auf PW Pi laden)
//node .\deployJsonToServer.js vb (= Dateien auf VB laden)
//node .\deployJsonToServer.js laila (= Dateien auf Lailas Player laden)

//Dort liegen / dorthin kommen die Dateien
const audioDirLocal = "C:/Users/Martin/Desktop/media/audioDone";
const audioDir = "/media/usb_audio/audio";

//Libs
const zipFolder = require('zip-a-folder');
const SSH2Promise = require('ssh2-promise');
const Client = require('ssh2-sftp-client');
const fs = require('fs-extra');
const glob = require("glob");
const path = require("path");

//Connection laden
const connection = require("./connection.js");

//Async Methode fuer Await Aufrufe
async function main() {

    //Wohin werden files hochgeladen?
    const targetMachine = process.argv[2] || "pw";
    console.log("deploy audio files to server " + targetMachine + ": " + connection[targetMachine].host);

    //SSH Verbindung (fuer unzip)
    console.log("connect ssh");
    const ssh = new SSH2Promise({
        host: connection[targetMachine].host,
        username: connection[targetMachine].user,
        password: connection[targetMachine].password
    });
    await ssh.connect();

    //sftp-Verbindung um files hochzuladen
    console.log("connect sftp");
    const sftp = new Client();
    await sftp.connect({
        host: connection[targetMachine].host,
        port: '22',
        username: connection[targetMachine].user,
        password: connection[targetMachine].password
    });

    //Ermitteln wohin der Audio Ordner hochgeladen werden sollen, dazu ueber alle JSON-Configs gehen (janosch.json, bibi.json, rz.json,...)
    console.log("get file infos from local json");
    let albumList = {};

    //TODO config app ID
    const files = glob.sync("../../src/assets/json/pw/*/*.json")
    for (const file of files) {

        //Ordner ermitteln wohin Dateien kommen: hsp/janosch
        const folder = path.basename(path.dirname(file));
        const subfolder = path.basename(file, '.json');

        //Ueber Eintraege in JSON Datei (z.B. janosch.json gehen)
        const json = await fs.readJSON(file);
        for (album of json) {
            albumList[album.file] = folder + "/" + subfolder;
        }
    };

    //Lokale ZIPs Files werden nach Upload wieder geloescht
    let zipsToDelete = [];

    //Ordner ermitteln, die hochgeladen werden sollen
    console.log("get local folders to upload")
    const folders = await fs.readdir(audioDirLocal)
    for (const folder of folders) {
        const audioFolder = audioDirLocal + "/" + folder;
        if (fs.statSync(audioFolder).isDirectory()) {

            //Ordnername...
            const folderName = path.basename(folder);

            console.log("zip local folder");
            const zipFolderPath = audioDirLocal + "/" + folderName + ".zip"
            await zipFolder.zip(audioFolder, zipFolderPath);
            zipsToDelete.push(zipFolderPath);

            const serverAudioPath = audioDir + "/" + albumList[folderName] + "/" + folderName;

            //Verzeichnis loeschen (z.B. falls Dateien ausgetauscht werden)
            const dir_exists = await sftp.exists(serverAudioPath);
            if (dir_exists) {
                console.log("delete remote folder " + serverAudioPath);
                await sftp.rmdir(serverAudioPath, true);
            }

            //Remote folder anlegen
            console.log("create remote folder " + serverAudioPath);
            await sftp.mkdir(serverAudioPath, true);

            //Zip-Upload
            console.log("upload zip files to server path " + serverAudioPath);
            await sftp.fastPut(zipFolderPath, serverAudioPath + "/" + folderName + ".zip");

            //Unzip
            console.log("unzip remote files");
            //TODO in einem Befehl mit prefix
            await ssh.exec("cd " + serverAudioPath + " && unzip " + folderName + ".zip");

            //Remote Zip loeschen
            console.log("delete remote zip  " + serverAudioPath + "/" + folderName + ".zip");
            await sftp.delete(serverAudioPath + "/" + folderName + ".zip");
        }
    };

    //SFTP beenden, TODO aus SSH
    console.log("upload done");
    await sftp.end();

    //Lokale ZIPs loeschen
    for (zip of zipsToDelete) {
        console.log("delete local zip " + zip)
        fs.removeSync(zip);
    }

    //Programm beenden
    process.exit();
}

//Deployment starten
main();