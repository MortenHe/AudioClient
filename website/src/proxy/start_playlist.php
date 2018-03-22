<?php
header("Access-Control-Allow-Origin: *");

//POST-Daten lesen und in PHP-Array umwandeln
$postdata = file_get_contents('php://input');
$request = json_decode($postdata, true);

//Videomodus fuer korrekte Link zu Video
$video_mode = $request["video_mode"];

//$video_dir = "/home/pi/video/" . $video_mode . "/";
$video_dir = "C:/Users/Martin/Desktop/media/done/" . $video_mode . "/";

//Liste kommt als Komma-sep. Liste. Diese als Array
$playlist = array_map(function ($filename) {
    global $video_mode;
    return $video_mode . "/" . $filename;
}, $request["video_list"]);

//Fuer sh-Skript Playlist als space-sep. String
$args = implode(" ", $playlist);

echo "Playlist: " . $args . "<br>";

//playlist.sh stoppen, damit keine weiteren Videos geladen werden
echo shell_exec("kill -9 $(pgrep -f playlist.sh) 2>&1");

//Playlist in OMXPlayer laden
echo shell_exec("/home/pi/mh_prog/playlist.sh " . $args . " 2>&1");