<?php
header("Access-Control-Allow-Origin: *");

//Dateiname laden
echo "Fahre Pi herunter<br>";

//TV ausschalten
echo shell_exec("echo 'standby 0' | cec-client -s -d 1");

//Pi herunterfahren
echo shell_exec("/sbin/shutdown -h now 2>&1");