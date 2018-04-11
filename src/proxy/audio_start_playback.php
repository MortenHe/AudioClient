<?php
header("Access-Control-Allow-Origin: *");

//POST-Daten lesen und in PHP-Array umwandeln
$postdata = file_get_contents('php://input');
$request = json_decode($postdata, true);

//Verzeichnis erstellen, wo mp3s liegen
$playlist_dir = "/media/usb_red/audio/" . $request["mode"] . "/" . $request["item_list"][0];

echo "Playlist-Dir: " . $playlist_dir . "<br>";

//bisherige Playlist leeren
echo shell_exec("mocp --clear");

//Playback stoppen
echo shell_exec("mocp --stop");

//neue Playlist laden
echo shell_exec("mocp -a " . $playlist_dir);

//Playback der neuen Playlist starten
echo shell_exec("mocp --p");