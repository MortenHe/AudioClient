<?php
header("Access-Control-Allow-Origin: *");

//POST-Daten lesen und in PHP-Array umwandeln
$postdata = file_get_contents('php://input');
$request = json_decode($postdata, true);

//Command auslesen
$command = $request["command"];

//Welcher Befehl soll ausgefuehrt werden (mute/unmute, change volume,...)
switch ($command) {

    //toggle mute
    case "toggle-mute":
        echo "toggle mute<br>";
        $shell_command = "sudo amixer sset 'PCM' mute";
        //echo shell_exec("sudo amixer -D pulse set Master 1+ toggle");
        echo $shell_command;
        echo shell_exec($shell_command);
        break;

    //lauter leiser um +/- x %
    case "change-volume":
        echo "change volume<br>";
        $shell_command = "sudo amixer sset 'PCM' " . $request["params"]["step"] . "%" . $request["params"]["direction"];
        echo $shell_command;
        echo shell_exec($shell_command);
        break;

    //Volume Wert setzen (in %)
    case "set-volume":
        echo "set volume<br>";
        $shell_command = "sudo amixer sset 'PCM' " . $request["params"]["volume"] . "%";
        echo $shell_command;
        echo shell_exec($shell_command);
        break;

    //Command nicht gefunden
    default:
        echo "no such command: " . $command;
}
