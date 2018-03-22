<?php
header("Access-Control-Allow-Origin: *");

echo "Stoppe Video<br>";

//OMXPlayer stoppen
echo shell_exec("killall omxplayer.bin 2>&1");