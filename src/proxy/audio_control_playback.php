<?php
header("Access-Control-Allow-Origin: *");

//Welcher Befehl soll ausgefuehrt werden (pause, play, seek,...)
$command = $_GET["command"];

//passende Action ausfuehren
switch($command) {

    //toggle pause
    case "pause":
        echo "pause / unpause";    
        echo shell_exec("mocp --toggle-pause");
        break;

    //vorheriger Track
    case "previous-track":
        echo "previous track";
        echo shell_exec("mocp --previous");
        break;

    //Naechster Titel
    case "next-track":
        echo "next track";
        echo shell_exec("mocp --next");
        break;

    //Command nicht gefunden
    default:
        echo "no such command";
}