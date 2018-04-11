<?php
header("Access-Control-Allow-Origin: *");

//Welcher Befehl soll ausgefuehrt werden (pause, play, seek,...)
$command = $_GET["command"];

//passende Action ausfuehren
switch($command) {

    //toggle pause
    case "pause":
        echo "pause / unpause";    
        echo shell_exec("echo -n p > /home/pi/mh_prog/omxpipe");
        break;

    //30 sec nach links
    case "seek-left":
        echo "seek -30 sec";
        echo shell_exec("echo -n $'\e'[D > /home/pi/mh_prog/omxpipe");
        break;

    //30 sec nach rechts
    case "seek-right":
        echo "seek +30 sec";
        echo shell_exec("echo -n $'\e'[C > /home/pi/mh_prog/omxpipe");
        break;

    //Command nicht gefunden
    default:
        echo "no such command";
}