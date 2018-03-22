<?php
header("Access-Control-Allow-Origin: *");

//Dateiname laden
echo "Fahre Pi herunter<br>";

//Pi herunterfahren
echo shell_exec("/sbin/shutdown -h now 2>&1");