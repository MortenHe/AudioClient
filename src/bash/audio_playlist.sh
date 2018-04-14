#!/bin/sh

#aktuellen Playlist-Ordner ausgeben
echo $1

#Wenn der mocp server noch nicht laeuft
if !(pgrep mocp)
    then 
    #Server starten
    echo start server
    mocp --server
fi

#Playlist leeren
mocp --clear

#Playback stoppen
mocp --stop

#neue Playlist laden
mocp -a $1

#Playlist abspielen
mocp --play