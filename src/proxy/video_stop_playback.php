<?php
header("Access-Control-Allow-Origin: *");

echo "Stop video playback<br>";

//video_playlist.sh stoppen, damit keine weiteren Videos geladen werden, wenn OMXPlayer beendet wurde
echo shell_exec("kill -9 $(pgrep -f video_playlist.sh) 2>&1");

//aktuelles Video in OMXPlayer stoppen
echo shell_exec("killall omxplayer.bin 2>&1");