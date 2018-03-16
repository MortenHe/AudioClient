<?php
header("Access-Control-Allow-Origin: *");

echo "Stoppe Video<br>";

//OMXPlayer stoppen
shell_exec("killall omxplayer.bin");