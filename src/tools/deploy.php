<?php

//SFTP und Connection-Daten laden
include 'Net/SFTP.php';
include 'connection.php';

//Base Path auf Server
$remote_base_path = "/var/www/html/";

//SFTP Verbindung aufbauen
$sftp = new Net_SFTP($connection["host"]);

//Wenn kein Login moeglich
if (!$sftp->login($connection["user"], $connection["password"])) {

    //Programm abbrechen
    exit('Login Failed');
}

//Welche Verzeichnisse sollen auf dem Server erneuert werden?
$packages = [
    //Video-Bilder-Ordner
    "assets-video" => [
        "active" => true,
        "dirs" => [[
            "local" => "../../dist-video/assets/images",
            "remote" => "wvp/assets/images"]],
    ],
    //Video-Bilder-Ordner
    "assets-audio" => [
        "active" => true,
        "dirs" => [[
            "local" => "../../dist-audio/assets/images",
            "remote" => "wap/assets/images"]],
    ],
    //PHP Proxy-Skripte
    "proxy" => [
        "active" => true,
        "dirs" => [[
            "local" => "../proxy",
            "remote" => "proxy"]],
    ],
    //Itemlist als JSON
    "itemlist" => [
        "active" => true,
        "dirs" => [
            [
                "local" => "../proxy/json/video",
                "remote" => "proxy/json/video"],
            [
                "local" => "../proxy/json/audio",
                "remote" => "proxy/json/audio"],
            [
                "local" => "../proxy/json/video/jahresvideo",
                "remote" => "proxy/json/video/jahresvideo"],
            [
                "local" => "../proxy/json/video/kinder",
                "remote" => "proxy/json/video/kinder"],
            [
                "local" => "../proxy/json/audio/hsp",
                "remote" => "proxy/json/audio/hsp"],
            [
                "local" => "../proxy/json/audio/kindermusik",
                "remote" => "proxy/json/audio/kindermusik"],
        ],
    ],
    //Angular-Dist Code fuer Video
    "website-video" => [
        "active" => true,
        "dirs" => [[
            "local" => "../../dist-video",
            "remote" => "wvp"]],
    ],
    //Angular-Dist Code fuer Audio
    "website-audio" => [
        "active" => true,
        "dirs" => [[
            "local" => "../../dist-audio",
            "remote" => "wap"]],
    ],
];

//Welche Dateien / Verzeichnisse sollen beim Loeschen / Hochladen ingnoriert werden?
$ignore_list = [".", "..", ".htaccess", "json", "audio", "video", "jahresvideo", "kinder", "hsp", "kindermusik", "assets"];

//Ueber packages gehen
foreach ($packages as $package => $obj) {

    //Wenn dieses package aktualsisiert werden soll
    if ($obj["active"]) {

        //in welchem package sind wir
        echo "== package: $package\n";

        //Ueber Verzeichnisse dieses packages gehen
        foreach ($obj["dirs"] as $dir) {

            //Pfad zu Dateien auf Server
            $remote_dir = $remote_base_path . $dir["remote"];

            //Dateien auf Server loeschen
            delete_files_on_server($remote_dir);

            //Neue Dateien auf Server laden
            upload_files_to_server($dir["local"], $remote_dir);
        }
    }
}

//Dateien auf Server loeschen
function delete_files_on_server($dir)
{
    global $sftp, $ignore_list;

    //Wenn es das angewaehlte Verzeichnis gibt
    if ($sftp->chdir($dir)) {

        //Ueber Dateiein in diesem Verzeichnis gehen
        foreach ($sftp->nlist() as $file) {

            //Wenn Datei nicht bei der Loeschung irngoriert werden soll
            if (!in_array($file, $ignore_list)) {

                //Datei loeschen
                echo "==== delete file: " . $file . "\n";
                $sftp->delete($file);
            }

            //Datei soll nicht geloescht werden
            else {
                echo "ignoring for deletion: $file\n";
            }
        }
    }

    //angewaehltes Verzeichnis existiert nicht
    else {
        echo "remote dir $dir doesn't extist\n";
    }
}

//Dateien auf Server laden
function upload_files_to_server($local_dir, $remote_dir)
{
    global $sftp, $ignore_list;

    //Wenn es das angewaehlte Verzeichnis gibt
    if ($sftp->chdir($remote_dir)) {

        //Ueber lokale Dateien gehen
        foreach (glob(__DIR__ . "/" . $local_dir . "/*") as $file) {

            //Wenn Datei hochgeladen werden soll
            if (!in_array(basename($file), $ignore_list)) {

                //Datei hochladen
                echo "==== upload file: " . $file . "\n";
                $sftp->put(basename($file), $file, NET_SFTP_LOCAL_FILE);
            }

            //Datei soll nicht hochgeladen werden
            else {
                echo "ignoring for upload: $file\n";
            }
        }
    }

    //angewaehltes Verzeichnis existiert nicht
    else {
        echo "remote dir $remote_dir doesn't extist\n";
    }
}
