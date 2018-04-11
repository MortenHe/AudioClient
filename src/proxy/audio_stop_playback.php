<?php
header("Access-Control-Allow-Origin: *");

echo "Stop audio playback<br>";

//Playback stoppen
echo shell_exec("mocp --stop");