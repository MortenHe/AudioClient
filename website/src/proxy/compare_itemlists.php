<?php

//Skript vergleicht die Liste der Videos/Audios in der Weboberflaeche und im Dateisystem und gibt Abweichungen aus
header("Access-Control-Allow-Origin: *");

//video vs. audio
$app_mode = $_GET["app_mode"];

//Ordner wo die Items und Config liegen unterschiedlich fuer Produktivsystem
if ($_GET["production"] === "true") {
    $item_dir = "/media/usb_red/" . $app_mode . "/*/*/*";
    $config_url = "http://192.168.0.150/proxy/get_itemlist.php?app_mode=" . $app_mode . "&all=true";
}

//und Testsystem
else {
    $item_dir = "C:/Users/Martin/Desktop/media/done/" . $app_mode . "/*/*/*";
    $config_url = "http://localhost/WebPlayer/website/src/proxy/get_itemlist.php?app_mode=" . $app_mode . "&all=true";
}

//Config-Daten per cURL holen
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $config_url);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$data_browser_json = curl_exec($ch);
curl_close($ch);

//JSON -> PHP Array
$data_browser = json_decode($data_browser_json, true);

//Ueber Items in Config gehen
foreach($data_browser as $mode => $mode_data) {

    //fuer jedes item
    foreach($mode_data["items"] as $item) {

        //den langen Pfad merken: kinder/janosch/janosch-panama.mp4 (video) hsp/janosch/gesund (audio)
        $array_browser[] = $mode . "/" . $item["mode"] . "/" . $item["file"];
    }
}

//Bei Video
if ($app_mode === "video") {
    
    //werden keine Verzeichnisse sonder Dateien verglichen
    $item_dir .= ".mp4";
}

//Ueber Ordner (audio) / Dateien (video) auf Server gehen
foreach (glob($item_dir) as $server_item) {

    //Ordner- / Dateinamen in Array speichern in langer Form: kinder/janosch/janosch-panama.mp4 (video) oder hsp/janosch/wolkenzimmerhaus (audio)
    $array_server[] = basename(dirname(dirname($server_item))) . "/" . basename(dirname($server_item)) . "/" . basename($server_item);
}

//Ausgabe JSON Array
$output = [];

//welche Items fehlen auf dem Server
$output["missing_server"] = array_values(array_diff($array_browser, $array_server));

//welche Items fehlen auf im Browser
$output["missing_browser"] = array_values(array_diff($array_server, $array_browser));

//JSON-Array mit den Werten zurueckgeben
echo json_encode($output);