<?php
header("Access-Control-Allow-Origin: *");

//POST-Daten lesen und in PHP-Array umwandeln
$postdata = file_get_contents('php://input');
$request = json_decode($postdata, true);

//Modus fuer Links zu Videos
$mode = $request["mode"];

/* weg ?
//Unterschiedliche Verzeichnisse wo die Videos liegen fuer Produktivsystem
if($request["production"] === "true") {
    $video_dir = "/media/usb_red/video/" . $mode . "/";
}

//und Test-System
else {
    $video_dir = "C:/Users/Martin/Desktop/media/done/video/" . $mode . "/";
}
*/

//Dateinamen Array um Pfad des Modus ergaenzen
$playlist = array_map(function ($filename) {
    global $mode;
    return $mode . "/" . $filename;
}, $request["item_list"]);

//Fuer sh-Skript Playlist als space-sep. String
$args = implode(" ", $playlist);

echo "Playlist: " . $args . "<br>";

//video_playlist.sh stoppen, damit keine weiteren Videos geladen werden
echo shell_exec("kill -9 $(pgrep -f video_playlist.sh) 2>&1");

//Playlist in OMXPlayer laden
echo shell_exec("/home/pi/mh_prog/video_playlist.sh " . $args . " 2>&1");