#!/bin/sh

#ggf. laufenden OMXPlayer stoppen
killall omxplayer.bin

#ueber die abzuspielenden Videos gehen, die als Parameter mitgeliefert wurden (playlist.sh vid1.mp4 vid2.mp4)
for entry in "$@"
do

  #aktuelles Video ausgeben
  echo /media/usb_red/video/$entry

  #Video in OMXPlayer abspielen, -b = blank (schwarzer Hintergrund)
  omxplayer -b /media/usb_red/video/$entry

 # omxplayer -b /media/usb_red/video/$entry < /home/pi/mh_prog/omxpipe &
 # echo . > /home/pi/mh_prog/omxpipe
done

#Wenn Playlist durchlaufen wurden, ein 3-min Video mit Countdown anzeigen
omxplayer -b /media/usb_red/video/shutdown.mp4

#wenn das Video durchgelaufen ist, Pi runterfahren
/sbin/shutdown -h now 2>&1