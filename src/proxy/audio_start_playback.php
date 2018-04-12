<?php
header("Access-Control-Allow-Origin: *");

//POST-Daten lesen und in PHP-Array umwandeln
$postdata = file_get_contents('php://input');
$request = json_decode($postdata, true);

//Verzeichnis erstellen, wo mp3s liegen
$playlist_dir = "/media/usb_red/audio/" . $request["mode"] . "/" . $request["item_list"][0];

echo "Playlist-Dir: " . $playlist_dir . "<br>";

$command = "sudo /home/pi/mh_prog/audio_playlist.sh " . $playlist_dir . " 2>&1";
echo $command . "<br>";

//Playlist in OMXPlayer laden
echo shell_exec($command);


/*
//bisherige Playlist leeren
echo shell_exec("mocp --clear");

echo "cleared<br>";

//Playback stoppen
echo shell_exec("mocp --stop");

echo "stopped<br>";

//neue Playlist laden
echo shell_exec("mocp -a " . $playlist_dir);
echo "playlist added<br>";

//Playback der neuen Playlist starten
echo shell_exec("mocp --play");
echo "start play";