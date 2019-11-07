//Nur JSON-Config auf Server uebertragen
//node .\deployJsonToServer.js pw (= Dateien auf PW Pi laden)
//node .\deployJsonToServer.js vb (= Dateien auf VB laden)
//node .\deployJsonToServer.js laila (= Dateien auf Lailas Player laden)

//Dort liegen / dorthin kommen die Dateien
const localAudioDir = "C:/Users/Martin/Desktop/media/audioDone";
const remoteAudioDir = "/media/usb_audio/audio";

//Connection laden
const connection = require("./connection.js");

//Libs
const zipFolder = require('zip-a-folder');
const SSH2Promise = require('ssh2-promise');
const Client = require('ssh2-sftp-client');
const fs = require('fs-extra');
const glob = require("glob");
const path = require("path");

//Async Methode fuer Await Aufrufe
async function main() {

    //Wohin werden files hochgeladen?
    const targetMachine = process.argv[2] || "pw";
    console.log("deploy audio files to server " + targetMachine + ": " + connection[targetMachine].host);

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

    //Lokale ZIPs Files werden nach Upload wieder geloescht
    const localZipsToDelete = [];

    //Lokale Ordner ermitteln, die hochgeladen werden sollen
    console.log("get local folders to upload")
    const localFolders = await fs.readdir(localAudioDir)
    for (const localFolderName of localFolders) {
        const localAudioFolder = localAudioDir + "/" + localFolderName;
        if (fs.statSync(localAudioFolder).isDirectory()) {

            //Zip erstellen von lokalem Ordner und fuer spaetere Loeschung merken
            const localZipFolderPath = localAudioDir + "/" + localFolderName + ".zip"
            console.log("create zip " + localZipFolderPath + " from " + localAudioFolder);
            await zipFolder.zip(localAudioFolder, localZipFolderPath);
            localZipsToDelete.push(localZipFolderPath);

            //Wo sollen die Dateien auf Server liegen? Verzichnis ggf. loeschen und neu anlegen
            const remoteAudioPath = remoteAudioDir + "/" + albumList[localFolderName] + "/" + localFolderName;
            const dir_exists = await sftp.exists(remoteAudioPath);
            if (dir_exists) {
                console.log("delete remote folder " + remoteAudioPath);
                await sftp.rmdir(remoteAudioPath, true);
            }

            //Remote folder anlegen
            console.log("create remote folder " + remoteAudioPath);
            await sftp.mkdir(remoteAudioPath, true);

            //Zip-Upload
            const remoteZipPath = remoteAudioPath + "/" + localFolderName + ".zip";
            console.log("upload local zip " + localZipFolderPath + " to server " + remoteZipPath);
            await sftp.fastPut(localZipFolderPath, remoteZipPath);

            //Unzip
            console.log("unzip remote file " + remoteZipPath + " to " + remoteAudioPath);
            await ssh.exec("unzip " + remoteZipPath + " -d " + remoteAudioPath);

            //Remote Zip loeschen
            console.log("delete remote zip " + remoteZipPath);
            await sftp.delete(remoteZipPath);
        }
    };

    //SFTP beenden, TODO aus SSH
    console.log("upload done");
    await sftp.end();
    await ssh.close();

    //Lokale ZIPs loeschen
    for (zip of localZipsToDelete) {
        console.log("delete local zip " + zip)
        fs.removeSync(zip);
    }

    //Programm beenden
    process.exit();
}

//Upload starten
main();