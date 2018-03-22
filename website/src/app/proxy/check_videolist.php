<?php

//Skript vergleicht die Liste der Videos in der Weboberflaeche und im Dateisystem und gibt Abweichungen aus
header("Access-Control-Allow-Origin: *");

//POST-Daten lesen und in PHP-Array umwandeln
$postdata = file_get_contents('php://input');
$request = json_decode($postdata, true);

//video_mode um korrekten Ordner zu finden wo die Videos liegen
$video_mode = $request["video_mode"];

//Ordner wo die Videos liegen
//$video_dir = "/home/pi/video/" . $video_mode . "/";
$video_dir = "C:/Users/Martin/Desktop/media/done/" . $video_mode . "/*/";

//Liste der Videos in Browser (kommt als Array)
$video_array_browser = $request["video_list"];

//Videos auf Server sammeln
$video_array_server = [];

//Ueber Dateien auf Server gehen
foreach (glob($video_dir . "*.{mp4,m2v}", GLOB_BRACE) as $server_file) {

    //Dateinamen in Array speichern
    $video_array_server[] = basename(dirname($server_file)) . "/" . basename($server_file);
}

//Ausgabe JSON Array
$output = [];

//welche Videos fehlen auf dem Server
$output["missing_server"] = array_values(array_diff($video_array_browser, $video_array_server));

//welche Videos fehlen auf im Browser
$output["missing_browser"] = array_values(array_diff($video_array_server, $video_array_browser));

//JSON-Array mit den Werten zurueckgeben
echo json_encode($output);