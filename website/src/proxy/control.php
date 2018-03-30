<?php
header("Access-Control-Allow-Origin: *");

echo "Pause / Unpause";

//Playlist in OMXPlayer pausieren oder weiterspielen
//echo shell_exec("echo -n $'\e'[C > /home/pi/mh_prog/omxpipe");
echo shell_exec("echo -n $'\e'[D > /home/pi/mh_prog/omxpipe");