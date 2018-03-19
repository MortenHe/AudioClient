<?php
header("Access-Control-Allow-Origin: *");

//Dateiname laden
$playlist = $_GET["filename_string"];
$args = str_replace(',', ' ', $playlist);

echo "Playlist: " . $args . "<br>";

//playlist.sh stoppen, damit keine weiteren Videos geladen werden
echo shell_exec("kill -9 $(pgrep -f playlist.sh) 2>&1");

//Playlist in OMXPlayer laden
echo shell_exec("/home/pi/mh_prog/playlist.sh " . $args . " 2>&1");