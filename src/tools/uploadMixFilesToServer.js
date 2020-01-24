//Audiodateien fuer NewSHPlayer Modus auf Server uebertragen
//node .\uploadMixFilesToServer.js pw (= Dateien auf PW Pi laden)
//node .\uploadMixFilesToServer.js vb (= Dateien auf VB laden)
//node .\uploadMixFilesToServer.js laila (= Dateien auf Lailas Player laden)

//Connection laden
const connection = require("./connection.js");

//Woher und wohin files / folder hochgeladen?
const targetMachine = process.argv[2] || "pw";

//Dort liegen / dorthin kommen die Dateien
const localAudioDir = "C:/Users/Martin/Desktop/media/mix" + targetMachine.toUpperCase();
const remoteAudioDir = "/media/usb_audio/shplayer";

console.log("upload audio files from " + localAudioDir);
console.log("upload to server " + targetMachine + ": " + connection[targetMachine].host);

//Libs laden
const Client = require('ssh2-sftp-client');
const fs = require('fs-extra');
const path = require("path");

//Async Methode fuer Await Aufrufe
async function main() {

    //sftp-Verbindung um files hochzuladen
    console.log("connect sftp");
    const sftp = new Client();
    await sftp.connect({
        host: connection[targetMachine].host,
        port: '22',
        username: connection[targetMachine].user,
        password: connection[targetMachine].password
    });

    //Pro Player gibt es unterschiedliche Modi (sh, laila, luis, mh)
    console.log("get local files and folders to upload")
    const modeFolders = await fs.readdir(localAudioDir);
    for (const modeFolder of modeFolders) {
        console.log("check folder " + modeFolder);

        //z.B. media/usb_red/laila
        const remoteAudioPath = remoteAudioDir + "/" + modeFolder;

        //Dateien parallel hochladen
        const filePromises = [];

        //lokale Dateien und Ordner, die hochgeladen werden sollen
        const localFilesAndFolders = await fs.readdir(localAudioDir + "/" + modeFolder)
        for (const fileOrFolderToUpload of localFilesAndFolders) {
            const fileOrFolder = localAudioDir + "/" + modeFolder + "/" + fileOrFolderToUpload;

            //Wenn es eine einzelne (mp3)-Datei ist
            if (fs.statSync(fileOrFolder).isFile()) {

                //Nur mp3-Dateien hochladen
                if (path.extname(fileOrFolder).toLowerCase() === ".mp3") {

                    //Jeder Upload als Promise, damit mehrere Uploads gleichzeitig laufen koennen
                    console.log("upload " + fileOrFolderToUpload + " to folder " + remoteAudioPath);
                    filePromises.push(sftp.fastPut(fileOrFolder, remoteAudioPath + "/" + fileOrFolderToUpload));
                }

                //andere Dateiformate ignorieren
                else {
                    console.log("ignore " + fileOrFolderToUpload);
                }
            }

            //Es ist ein Verzeichnis
            else if (fs.statSync(fileOrFolder).isDirectory()) {

                //Dateien dieses Ordners einzeln hochladen
                const $readAudioDir = fs.readdir(fileOrFolder);

                //Wo sollen die Dateien auf Server liegen? Verzichnis ggf. loeschen und neu anlegen (damit es leer ist)
                const remoteAudioPathFull = remoteAudioPath + "/" + fileOrFolderToUpload;
                const dir_exists = await sftp.exists(remoteAudioPathFull);
                if (dir_exists) {
                    console.log("delete remote folder " + remoteAudioPathFull);
                    await sftp.rmdir(remoteAudioPathFull, true);
                }

                //Remote folder anlegen
                console.log("create remote folder " + remoteAudioPathFull);
                const $makeRemoteDir = sftp.mkdir(remoteAudioPathFull, true);

                //Warten bis remote-Ordner angelegt wurde und lokale Dateien gelesen wurden
                const folderPromises = await Promise.all([$makeRemoteDir, $readAudioDir]);

                //Ueber einzelne Dateien gehen und hochladen
                const singleFilesToUpload = folderPromises[1];
                for (const singleFileToUpload of singleFilesToUpload) {

                    //Nur mp3-Dateien hochladen
                    if (path.extname(singleFileToUpload).toLowerCase() === ".mp3") {

                        //Jeder Upload als Promise, damit mehrere Uploads gleichzeitig laufen koennen
                        console.log("upload " + singleFileToUpload + " to " + remoteAudioPathFull);
                        filePromises.push(sftp.fastPut(localAudioDir + "/" + modeFolder + "/" + fileOrFolderToUpload + "/" + singleFileToUpload, remoteAudioPathFull + "/" + singleFileToUpload));
                    }

                    //andere Dateiformate ignorieren
                    else {
                        console.log("ignore " + singleFileToUpload);
                    }
                }
            }
        }

        //Warten bis alle Promises erfuellt sind (=alle Dateien hochgeladen wurden)
        await Promise.all(filePromises);
    }

    //SFTP und Programm beenden
    console.log("upload done");
    await sftp.end();
    process.exit();
}

//Upload starten
main();