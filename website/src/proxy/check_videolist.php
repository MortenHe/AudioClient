<?php

//Skript vergleicht die Liste der Videos in der Weboberflaeche und im Dateisystem und gibt Abweichungen aus
header("Access-Control-Allow-Origin: *");

//Ordner wo die Videos liegen
$video_dir = "/media/usb_red/video/*/*/";
//$video_dir = "C:/Users/Martin/Desktop/media/done/*/*/";

//Skript, das die Videodateien liefert
$url = "http://192.168.0.150/proxy/get_videolist.php?all=true";
//$url = "http://localhost/WebPlayer/website/src/proxy/get_videolist.php?all=true";

//Config-Date per cURL holen
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$video_data_browser_json = curl_exec($ch);
curl_close($ch);

//JSON -> PHP Array
$video_data_browser = json_decode($video_data_browser_json, true);

//Videos aus Config sammeln
$video_array_browser = [];

//Ueber Videos in Config gehen
foreach($video_data_browser as $video_mode => $mode_data) {

    //fuer jedes Video
    foreach($mode_data["videos"] as $video) {

        //den langen Pfad merken: kinder/janosch/janosch-panama.mp4
        $video_array_browser[] = $video_mode . "/" . $video["mode"] . "/" . $video["file"];
    }
}

//Videos auf Server sammeln
$video_array_server = [];

//Ueber Dateien auf Server gehen
foreach (glob($video_dir . "*.{mp4}", GLOB_BRACE) as $server_file) {

    //Dateinamen in Array speichern in langer Form: kinder/janosch/janosch-panama.mp4
    $video_array_server[] = basename(dirname(dirname($server_file))) . "/" . basename(dirname($server_file)) . "/" . basename($server_file);
}

//Ausgabe JSON Array
$output = [];

//welche Videos fehlen auf dem Server
$output["missing_server"] = array_values(array_diff($video_array_browser, $video_array_server));

//welche Videos fehlen auf im Browser
$output["missing_browser"] = array_values(array_diff($video_array_server, $video_array_browser));

//JSON-Array mit den Werten zurueckgeben
echo json_encode($output);