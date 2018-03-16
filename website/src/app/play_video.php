<?php
header("Access-Control-Allow-Origin: *");

//Dateiname laden
$filename = $_GET["filename"];
echo "Starte Datei " . $filename . "<br>";

//OMXPlayer stoppen und neu starten
shell_exec("killall omxplayer.bin");
shell_exec("omxplayer -o hdmi /home/pi/video/" . $filename);