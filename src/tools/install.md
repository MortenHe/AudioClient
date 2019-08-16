### Allgemein
- **Raspi Image with Desktop** runterladen
- ggf. SD Karte [formattieren](https://www.sdcard.org/downloads/formatter_3/)
- SD Karte mit **WinDiskImager32** beschreiben

---

### Raspi mit Monitur und USB-Maus / -Tastatur
- **Bluetooth** deaktiveren

- **raspiconfig** durchklicken
  - pi Passwort **martin12**
  - **Sprachumgebung** de
  - **Keyboard Layout** de
  - **WiFi-Country** de
  - **WLAN** verbinden

- **raspiconfig** Oberfläche
  - **SSH** aktivieren

- **root-PW** setzen
  
      sudo -i
      passwd = **martin12**

- **SSH root login** aktivieren
   
      nano /etc/ssh/sshd_config
  
  #PermitRootLogin prohibit-password → #weg + yes (strg + w für Suche)
  
      /etc/init.d/ssh restart

---

### Router [Unitity Media Connect Box](http://192.168.0.1/common_page/login.html)
- Erweiterte Einstellungen (**DHCP**)

  IP-Adresse fest setzen auf **192.168.0.149**

---

### WinSCP mit **root**, **sftp**, **port 22**
- **Aliasse** setzen
  
      /root/.bashrc

  alias ..='cd ..'

  alias update='sudo apt-get update && sudo apt-get upgrade'

  alias startnode='/home/pi/mh_prog/AudioServer/startnode.sh'

   alias stopnode='/home/pi/mh_prog/AudioServer/stopnode.sh'
  
      source ~/.bashrc

- **Autostart** WebSocketServer
  
      /etc/rc.local
      
  vor exit 0 einfügen

  /home/pi/mh_prog/AudioServer/startnode.sh &

---

### SSH als **root** (MobaXterm)

- WLAN **powersave** deaktivieren

      iw dev wlan0 set power_save off
- **Node** installieren

      curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
      sudo apt-get install -y nodejs

- **Servercode**

      mkdir /home/pi/mh_prog
      cd /home/pi/mh_prog
      sudo apt-get install mplayer

  git clone https://github.com/MortenHe/AudioServer
             
      cd AudioServer
      npm install
      cp config.json.dist config.json

- **git config**

      git config --global user.email "martin-helfer@gmx.de"
      git config --global user.name "Martin Helfer"

- **Apache**

      sudo apt-get install apache2 -y
      sudo a2enmod rewrite
      sudo nano /etc/apache2/apache2.conf 
    
    allowOverride All setzten bei directory /var/www
    
      systemctl restart apache2

- **PHP** (Zwischen Anwendungen wechseln)

      sudo apt-get install php libapache2-mod-php
      visudo
     
    %www-data ALL=NOPASSWD: ALL
    
      mkdir /var/www/html/php
      cp /home/pi/mh_prog/AudioServer/activateApp.php /var/www/html/php/
   
    ggf. Rechte anpassen

      update

---

### **USB-Stick**
- Stick unter Windows als **usb_audio** mit **ntfs** formattieren
- Ordner **hsp**, **kindermusik**, **cds** anlegen
- USB **automount** aktivieren 

      sudo apt-get install ntfs-3g
      sudo mkdir /media/usb_audio

  UUID ermitteln
  
      sudo blkid -o list -w /dev/null
      sudo nano -w /etc/
      
    UUID=E012519312517010 /media/usb_audio/ ntfs-3g utf8,uid=pi,gid=pi,noatime 0

    (Ist der USB-Stick nicht eingesteckt, kommt man in den Emergency Mode. Dort das Passwort eingebeben und in /etc/fstab die Zeile mit dem externen USB-Stick auskommentieren)

    ---

    ### Visual Studio
    - Webseite **deployen**

        (Webseite testen)
          
          ng serve
    
       PW Webseite auf PW Pi laden

          cd src/tools
          node deployWebsiteToServer.js pw pw 

      PW JSON auf PW Pi laden (wenn sich nur config geändert hat)

          node deployJsonToServer.js pw pw

      (PW Assets mit PW Pi vergleichen)
          
          node compareLocalJsonWithServer.js pw pw
