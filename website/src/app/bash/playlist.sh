#!/bin/sh

#ggf. laufenden OMXPlayer stoppen
killall omxplayer.bin

#ueber die abzuspielenden Videos gehen, die als Parameter mitgeliefert wurden (playlist.sh vid1.mp4 vid2.mp4)
for entry in "$@"
do

  #aktuelles Video ausgeben
  echo $entry

  #Video in OMXPlayer abspielen
  omxplayer /home/pi/video/$entry > /dev/null
done