<?php
header("Access-Control-Allow-Origin: *");

echo "Pause / Unpause";

//Playlist in OMXPlayer pausieren oder weiterspielen
echo shell_exec("echo -n p > /home/pi/mh_prog/omxpipe");