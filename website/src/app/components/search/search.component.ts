import { Component } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { FormBuilder, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

//Zeit-Formattierung
import { add, str } from 'timelite'

//Video-Liste importieren
import { Video } from '../../config/main-config'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {

  //Welche Videos sollen geladen werden (kinder vs. jahresvideo)
  video_mode;

  //Liste der Videos zu Beginn leer (wird per php geladen)
  videos: Video[] = [];

  //Filtermoeglichkeiten (z.B. nur Bobo)
  mode_filter;

  //Playlist
  playlist = [];

  //Zu Beginn laeuft keine Playlist
  currentPlayedPlaylist;

  //Welches Video ist gerade aktiv (ueber den Dateiname gehen), zu Beginn kein Video aktiv
  active_video;

  //Form fuer Textsuche und ModeFilterung
  myForm;

  //Sortierung der Trefferliste zu Beginn nach Name
  orderField = 'name';

  //Zu Beginn aufsteigend sortieren
  reverseOrder = false;

  //Services und Router injecten
  constructor(private vs: VideoService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
  }

  //Beim Init
  ngOnInit() {

    //Form anlegen fuer Suchfeld und Mode Radio Buttons
    this.myForm = this.fb.group({

      //Videomodus-Select
      "select-video-mode": "",

      //Suchfeld (zu Beginn leer)
      "search": "",

      //Filter Inputs
      "mode": ""
    });

    //immer wenn sich die Route /serach/kinder -> /search/jahresvideo aendert
    this.route.paramMap.subscribe(params => {

      //Video-Modus (kinder vs. jahresvideo) aus URL-Parameter auslesen
      this.video_mode = params.get('video_mode');

      //Videoliste holen aus JSON holen
      this.vs.getVideolist().subscribe(VIDEOLIST => {

        //Wenn kein korrekter Parameter geliefert wurde
        if (VIDEOLIST[this.video_mode] === undefined) {

          //zu Kinder-Suche navigieren
          this.router.navigate(['/search/kinder']);
        }

        //korrekter Parameter
        else {

          //Videos des passenden Modus laden
          this.videos = VIDEOLIST[this.video_mode].videos.filter(item => {

            //Nur aktive Videos laden
            return item.active;
          });

          //Filter laden fuer diesen Modus
          this.mode_filter = VIDEOLIST[this.video_mode].filter;

          //Playlist leeren
          this.playlist = [];

          //ausgewaehlten Video-Modus in Select setzen
          this.myForm.controls["select-video-mode"].setValue(this.video_mode);

          //Alle-Filter auswaehlen
          this.myForm.controls["mode"].setValue("all");
        }
      });
    });
  }

  //zu anderem Videomodus wechseln
  changeVideoMode() {

    //Video-Modus anhand des Selects anpassen
    this.video_mode = this.myForm.controls["select-video-mode"].value;

    //zu passender URL navigieren
    this.router.navigate(['/search', this.video_mode]);
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
      this.reverseOrder = true;
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
    let playlist_length = str(playlist_length_array);

    //formattieren String (ohne fuehrende 0) ausgeben: "00:05:12" -> "5:12"
    return this.format_length_string(playlist_length);
  }

  //Zeitstring formattieren
  format_length_string(length_string) {

    //Wenn keine Stunde und keine 10-er Minute
    if (length_string.startsWith("00:0")) {

      //gekuerzten String zureuckgeben
      return length_string.substring(4);
    }

    //Wenn keine Stunde
    else if (length_string.startsWith("00:")) {

      //gekuerzten String zureuckgeben
      return length_string.substring(3);
    }

    //wenn keine 10er Stunde
    else if (length_string.startsWith("0")) {

      //gekuerzten String zureuckgeben
      return length_string.substring(1);
    }

    //keine Bedingung erfuellt
    else {

      //Original-String zurueckgeben
      return length_string;
    }
  }

  //einzelnes Video abspielen
  playSingleVideo(video) {

    //aktives Video setzen und dadurch optisch anpassen
    this.active_video = video.file;

    //Videoplaylist setzen mit Videoname und formiattierter Laenge
    this.currentPlayedPlaylist = {
      items: [video.name],
      length: this.format_length_string(video.length)
    }

    //Service aufrufen, der das Video startet
    this.vs.sendVideoPlayRequest(this.video_mode, [video.mode + "/" + video.file]);
  }

  //Playlist aus mehreren Videos laden
  startVideoPlaylist() {

    //aktives Video wieder zuruecksetzen, weil gerade kein einzelnes Video mehr laeuft
    this.active_video = null;

    //VideoPlaylist setzen mit Array der Namen der Video + Laenge der Playlist
    this.currentPlayedPlaylist = {
      items: this.playlist.map(item => item.name),
      length: this.getPlaylistLength()
    }

    //Liste der Dateinname fuer Serveranfrage
    let video_list = this.playlist.map(item => {
      return item.mode + "/" + item.file
    });

    //Playlist leeren
    this.playlist = [];

    //Service aufrufen, der das Videos startet
    this.vs.sendVideoPlayRequest(this.video_mode, video_list);
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