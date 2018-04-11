<?php
header("Access-Control-Allow-Origin: *");

echo "Stoppe Video<br>";

//playlist.sh stoppen, damit keine weiteren Videos geladen werden, wenn OMXPlayer beendet wurde
echo shell_exec("kill -9 $(pgrep -f playlist.sh) 2>&1");

//aktuelles Video in OMXPlayer stoppen
echo shell_exec("killall omxplayer.bin 2>&1");