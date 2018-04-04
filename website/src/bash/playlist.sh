#!/bin/sh

#ggf. laufenden OMXPlayer stoppen
killall omxplayer.bin

#ueber die abzuspielenden Videos gehen, die als Parameter mitgeliefert wurden (playlist.sh kinder/misc/vid1.mp4 kinder/misc/vid2.mp4)
for entry in "$@"
do

  #aktuelles Video ausgeben
  echo /media/usb_red/video/$entry

  #bisherige Fifo-Pipe entfernen
  sudo rm /home/pi/mh_prog/omxpipe

  #neue Fifo-Pipe anlegen
  mkfifo /home/pi/mh_prog/omxpipe

  #Video in OMXPlayer abspielen, -b = blank (schwarzer Hintergrund), & damit Skript nicht blockiert
  omxplayer -b /media/usb_red/video/$entry < /home/pi/mh_prog/omxpipe &
  
  # . in die Fifo schreiben, damit Player startet
  echo . > /home/pi/mh_prog/omxpipe

  #Wwarten bis der letzte Hintergrund-Prozess = Omxplayer  abgeschlossen ist
  wait $!
done

#Wenn Playlist durchlaufen wurden, ein 3-min Video mit Countdown anzeigen
omxplayer -b /media/usb_red/video/shutdown.mp4

#TV ausschalten
echo 'standby 0' | cec-client -s -d 1

#wenn das Video durchgelaufen ist, Pi runterfahren
/sbin/shutdown -h now 2>&1