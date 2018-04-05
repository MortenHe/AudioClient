import { Component, ViewChild } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { FormBuilder, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

//Video-Liste importieren
import { Video } from '../../config/main-config'
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {

  //Zugriff auf Child Komponente erlauben (video_active zuruecksetzen)
  @ViewChild('videoResultList') videoResultList;

  //Welche Videos sollen geladen werden (kinder vs. jahresvideo)
  videoMode;

  //Liste der Videos zu Beginn leer (wird per php geladen)
  videos: Video[] = [];

  //Filtermoeglichkeiten (z.B. nur Bobo)
  modeFilter;

  //Playlist
  playlist = [];

  //Zu Beginn laeuft keine Playlist
  currentPlayedPlaylist;

  //Form fuer Textsuche und ModeFilterung
  myForm;

  //Sortierung der Trefferliste zu Beginn nach Name
  orderField = 'name';

  //Zu Beginn aufsteigend sortieren
  reverseOrder = false;

  //Services und Router injecten
  constructor(private vs: VideoService, private pls: PlaylistService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
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
      this.videoMode = params.get('videoMode');

      //Videoliste holen aus JSON holen
      this.vs.getVideolist().subscribe(VIDEOLIST => {

        //Wenn kein korrekter Parameter geliefert wurde
        if (VIDEOLIST[this.videoMode] === undefined) {

          //zu Kinder-Suche navigieren
          this.router.navigate(['/search/kinder']);
        }

        //korrekter Parameter
        else {

          //Videos des passenden Modus laden
          this.videos = VIDEOLIST[this.videoMode].videos;

          //Filter laden fuer diesen Modus
          this.modeFilter = VIDEOLIST[this.videoMode].filter;

          //Playlist leeren
          this.pls.setPlaylist([])

          //ausgewaehlten Video-Modus in Select setzen
          this.myForm.controls["select-video-mode"].setValue(this.videoMode);

          //Alle-Filter auswaehlen
          this.myForm.controls["mode"].setValue("all");
        }
      });
    });

    //Playlist mit Service Subject abgleichen
    this.pls.getPlaylist().subscribe(playlist => {
      this.playlist = playlist
    });

    //CurrentPlayedPlaylist mit Service Subject abgleichen
    this.pls.getCurrentPlayedPlaylist().subscribe(currentPlayedPlaylist => {
      this.currentPlayedPlaylist = currentPlayedPlaylist
    });
  }

  //per Service Video in Playlist toggeln
  toggleInPlaylist(video) {
    this.pls.toggleInPlaylist(video);
  }

  //zu anderem Videomodus wechseln
  changeVideoMode() {

    //Video-Modus anhand des Selects anpassen
    this.videoMode = this.myForm.controls["select-video-mode"].value;

    //zu passender URL navigieren
    this.router.navigate(['/search', this.videoMode]);
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


 //per Service Laenge der Playlist ermitteln
  getPlaylistLength() {
      return this.pls.getPlaylistLength();
    }

  //Playlist aus mehreren Videos laden
  startVideoPlaylist() {

    //aktives Video wieder zuruecksetzen, weil gerade kein einzelnes Video mehr laeuft
    this.videoResultList.activeVideo = null;

    //per Service Videoplaylist starten
    this.pls.startVideoPlaylist(this.videoMode);
  }

  //Video pausieren oder wieder starten oder 30 sec nach links springen
  controlVideo(command) {

    //Service aufrufen, der z.B. das Video pausiert oder wieder startet oder 30 sec nach links spring
    this.vs.sendVideoControlRequest(command);
  }

  //Video stoppen
  stopVideo() {

    //aktives Video wieder zuruecksetzen, weil gerade kein Video mehr laeuft
    this.videoResultList.active_video = null;

    //aktuell abgespielte Playlist in Service zuruecksetzen
    this.pls.resetCurrentPlayedPlaylist();

    //Service aufrufen, der das Video stoppt
    this.vs.sendVideoStopRequest();
  }

  //Pi herunterfahren
  shutdownPi() {

    //Service aufrufen, der den Pi herunterfaehrt
    this.vs.sendShutdownRequest();
  }
}