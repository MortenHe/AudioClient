<?php
header("Access-Control-Allow-Origin: *");

//Dateiname laden
echo "Fahre Pi herunter<br>";

//Pi herunterfahren
echo shell_exec("/bin/shutdown -h now");