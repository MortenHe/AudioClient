<?php

//Skript vergleicht die Liste der Videos in der Weboberflaeche und im Dateisystem und gibt Abweichungen aus
header("Access-Control-Allow-Origin: *");

//POST-Daten lesen und in PHP-Array umwandeln
$postdata = file_get_contents('php://input');
$request = json_decode($postdata, true);

//Liste der Videos kommt als komma-sep. String
$video_string = $request["video_string"];

//Komma-sep. Liste als Array
$video_array_browser = explode(",", $video_string);

//Ueber Dateien auf Server gehen
foreach (glob("/home/pi/video/*.mp4") as $server_file) {

    //Dateinamen in Array speichern
    $video_array_server[] = basename($server_file);
}

//welche Videos fehlen auf dem Server
$missing_server = array_diff($video_array_browser, $video_array_server);

//ggf. fehlende Dateien auf dem Server ausgeben
echo "Auf dem Server fehlen:<br>" . join("<br>", $missing_server);

//welche Videos fehlen auf im Browser
$missing_browser = array_diff($video_array_server, $video_array_browser);

//ggf. fehlende Dateien im Browser ausgeben
echo "<br><br>Im Browser fehlen:<br>" . join("<br>", $missing_browser);
