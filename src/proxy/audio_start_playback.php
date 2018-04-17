<?php
header("Access-Control-Allow-Origin: *");

//POST-Daten lesen und in PHP-Array umwandeln
$postdata = file_get_contents('php://input');
$request = json_decode($postdata, true);

//Verzeichnis erstellen, wo mp3s liegen
$playlist_dir = "/media/usb_red/audio/" . $request["mode"] . "/" . $request["item_list"][0];

echo "Playlist-Dir: " . $playlist_dir . "<br>";

//Wenn Titel zufaellig wiedergegeben werden sollen
if ($request["random_playback"] == "1") {

    echo "Random Playback<br>";

    //Verzeichnis, in dem Symlinks erstellt werden. (mocp p kann Ordner nur in normaler Reihenfolge abspielen. Daher nummerierte Symlinks fuer zufaellig ausgewaehlte files)
    $random_dir = "/home/pi/mh_prog/random";

    //Ueber Dateien in random_dir gehen -> random_dir leeren
    foreach (glob($random_dir . "/*.mp3") as $linkfile) {

        //Wenn es die Datei ist
        if (file_exists($linkfile)) {

            //Und es ein Link ist
            if (is_link($linkfile)) {

                //Datei loeschen
                unlink($linkfile);
            }
        }
    }

    //alle Dateien von eigentlichem audio-dir holen
    $playlist_files = glob($playlist_dir . "/*.mp3");

    //Array zufaellig sortieren
    shuffle($playlist_files);

    //Counter fuer Nummerierung der Symlinks
    $counter = 1;

    //Ueber files in random-array gehen
    foreach ($playlist_files as $file) {

        //in random-dir einen nummerierten Symlink erstellen: "03 - Hallo Welt.mp3" => "01-03 - Hallo Welt.mp3"
        symlink($file, $random_dir . "/" . str_pad($counter, 2, "0", STR_PAD_LEFT) . "-" . basename($file));

        //Counter erhohen
        $counter++;
    }

    //Fuer Wiedergabe nicht das eigentlich audio-dir, sondern das random-dir nehmen
    $playlist_dir = $random_dir;
}

//Playlist-Bash-Skript mit passendem Verzeichnis fuer Audio-Dateien
$command = "sudo /home/pi/mh_prog/audio_playlist.sh " . $playlist_dir . " 2>&1";
echo $command . "<br>";

//Playlist in mocp laden
echo shell_exec($command);
