import { Component } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { FormBuilder, FormControl } from "@angular/forms";

//Zeit-Formattierung
import { add, str } from 'timelite'

//Video-Liste importieren
import { VIDEOS, Video } from '../../config/video'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  //Liste der Videos
  videos: Video[] = VIDEOS;

  //Playlist
  playlist = [];

  //Zu Beginn laeuft keine Playlist
  currentPlayedPlaylist = null;

  //Welches Video ist gerade aktiv (ueber den Dateiname gehen), zu Beginn kein Video aktiv
  active_video = null;

  //Form fuer Textsuche und ModeFilterung
  myForm;

  //Filtermoeglichkeiten
  mode_filter = [
    {
      "label": "Alle",
      "value": "*"
    },
    {
      "label": "Bibi & Tina",
      "value": "Bibi Tina"
    },
    {
      "label": "Bobo",
      "value": "Bobo"
    },
    {
      "label": "Conni",
      "value": "Conni"
    },
    {
      "label": "Janosch",
      "value": "Janosch"
    }
  ];

  //Sortierung der Trefferliste zu Beginn nach Name
  orderField = 'name';

  //Zu Beginn aufsteigend sortieren
  reverseOrder = false;

  //Videoservice und FormBuilder injecten
  constructor(private vs: VideoService, private fb: FormBuilder) {
  }

  //Beim Init
  ngOnInit() {

    //Form anlegen fuer Suchfeld und Mode Radio Buttons
    this.myForm = this.fb.group({

      //Suchfeld zu Beginn leer
      "search": "",

      //Zu Beginn den Radio Button "Alle" vorauswaehlen
      "mode": "*"
    });
  }

  //Sortierfeld setzen
  setOrder(field) {

    //Wenn nach Name sortiert wird
    if (field === "name") {

      //Immer aufsteigend sortieren
      this.reverseOrder = false;
    }

    //Wenn nach Laenge sortiert zum ersten Mal
    else if (field === "length" && this.orderField === "name") {

      //Nach Zeit absteigend sortieren
      this.reverseOrder = false;
    }

    //Wenn bereits nach Laenge sortiert wurde
    else {

      //Sortierreihenfolge toggeln
      this.reverseOrder = !this.reverseOrder;
    }

    //Sortierfeld setzen
    this.orderField = field;
  }

  //Video in Playlist einfuegen oder daraus entfernen
  toggleInPlaylist(file) {

    //Wenn das Video schon in der Playlist ist
    if (this.isInPlaylist(file)) {

      //Das Video aus der Playlist entfernen
      this.removeFromPlaylist(file)
    }

    //Video ist noch nicht in Playlist
    else {

      //Video in Playlist einfuegen
      this.playlist.push(file);
    }
  }

  //Video aus Playlist entfernen
  removeFromPlaylist(file) {

    //Index des Videos in Playlist ermitteln
    const index: number = this.playlist.indexOf(file);

    //Wenn Video in Playlist ist
    if (index !== -1) {

      //Video aus Playlist entfernen
      this.playlist.splice(index, 1);
    }
  }

  //Pruefen ob Video in Playlist ist
  isInPlaylist(file) {

    //Ist Video in Playlist?
    return this.playlist.indexOf(file) > -1;
  }

  //Laenge der Playlist ermitteln
  getPlaylistLength() {

    //Laengen-Merkmal aus Playlist-Array extrahieren und addieren
    let playlist_length_array = add(this.playlist.map(item => item.length));

    //Ergebnis als String: [0, 5, 12] -> "00:05:12"
    let playlist_length = str(playlist_length_array)

    //formattieren String (ohne fuehrende 0) ausgeben: "00:05:12" -> "5:12"
    return this.format_length_string(playlist_length);
  }

  //Zeitstring formattieren
  format_length_string(length_string) {

    //Wenn keine Stunde und keine 10-er Minute
    if (length_string.startsWith("00:0")) {

      //gekuerzten String zureuckgeben
      return length_string.substring(4)
    }

    //Wenn keine Stunde
    else if (length_string.startsWith("00:")) {

      //gekuerzten String zureuckgeben
      return length_string.substring(3)
    }

    //TODO: wenn keine 10er Stunde
    else if (length_string.startsWith("0")) {

      //gekuerzten String zureuckgeben
      return length_string.substring(1)
    }

    //keine Bedingung erfuellt
    else {

      //Original-String zurueckgeben
      return length_string
    }
  }

  //einzelnes Video abspielen
  playSingleVideo(video) {

    //aktives Video setzen und dadurch optisch anpassen
    this.active_video = video.file;

    //Videoplaylist setzen mit Videoname und Laenge
    this.currentPlayedPlaylist = {
      items: [video.name],
      length: video.length
    }

    //Service aufrufen, der das Video startet
    this.vs.sendVideoPlayRequest(video.file);
  }

  //Playlist aus mehreren Videos laden
  startVideoPlaylist() {

    //aktives Video wieder zuruecksetzen, weil gerade kein einzelnes Video mehr laeuft
    this.active_video = null;

    //Service aufrufen, der Playlist startet
    let filename_string = this.playlist.map(item => item.file).join(",");

    //VideoPlaylist setzen mit Array der Namen der Video + Laenge der Playlist
    this.currentPlayedPlaylist = {
      items: this.playlist.map(item => item.name),
      length: this.getPlaylistLength()
    }

    //Playlist leeren
    this.playlist = [];

    //Service aufrufen, der das Videos startet
    this.vs.sendVideoPlayRequest(filename_string);
  }

  //Video stoppen
  stopVideo() {

    //aktives Video wieder zuruecksetzen, weil gerade kein Video mehr laeuft
    this.active_video = null;

    //aktuell laufende Playlist zurecksetzen
    this.currentPlayedPlaylist = null

    //Service aufrufen, der das Video stoppt
    this.vs.sendVideoStopRequest();
  }

  //Pi herunterfahren
  shutdownPi() {

    //Service aufrufen, der den Pi herunterfaehrt
    this.vs.sendShutdownRequest();
  }
}