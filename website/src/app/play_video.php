<?php
header("Access-Control-Allow-Origin: *");

//Dateiname laden
$filename = $_GET["filename"];

//OMXPlayer stoppen und neu starten
shell_exec("killall omxplayer.bin && omxplayer -o hdmi /home/pi/video/" . $filename);