import { Component, OnInit } from '@angular/core';
import { Video } from '../../config/main-config';
import { PlaylistService } from '../../services/playlist.service';
import { VideoService } from '../../services/video.service';
import { ResultfilterService } from '../../services/resultfilter.service';

@Component({
  selector: 'resultlist',
  templateUrl: './resultlist.component.html',
  styleUrls: ['./resultlist.component.scss']
})

export class ResultlistComponent {

  //Videoliste
  videos: Video[];


  //Modus-Filter (conni, heidi,...)
  modeFilter: string;

  //Suchfeld-Filter
  searchFilter: string;

  //Sortierfeld
  orderField: string;

  //Umgekehrte Sortierung
  reverseOrder: boolean;

  //welches Video in der Liste wurde angeklickt?
  activeVideo: Video;

  //Services injecten
  constructor(private pls: PlaylistService, private vs: VideoService, private fs: ResultfilterService) { }

  //beim Init
  ngOnInit() {

    //Videoliste per Service abbonieren
    this.vs.getVideolist().subscribe(videos => this.videos = videos)

    //Mode-Filter per Service abbonieren
    this.fs.getModeFilter().subscribe(modeFilter => this.modeFilter = modeFilter);

    //Suchfeld-Filter per Service abbonieren
    this.fs.getSearchTerm().subscribe(searchFilter => this.searchFilter = searchFilter);

    //Sortierfeld per Service abbonieren
    this.fs.getOrderField().subscribe(orderField => this.orderField = orderField);

    //Umkehrte Sortierung per Service abbonieren
    this.fs.getReverseOrder().subscribe(reverseOrder => this.reverseOrder = reverseOrder);

    //Aktuell laufende Playlist per Service abbonieren
    this.pls.getCurrentPlayedPlaylist().subscribe(currentPlayedPlaylist => {

      //Wenn es eine Playlist gibt
      if (currentPlayedPlaylist) {

        //und sie durch den Playlistgenerator erstellt wurde
        if (currentPlayedPlaylist.playmode === "multi") {

          //kein Video in der Trefferliste als aktiv anzeigen
          this.activeVideo = null;
        }
      }

      //es gibt keine Playlist (mehr)
      else {

        //kein Video in der Trefferliste (mehr) als aktiv anzeigen
        this.activeVideo = null;
      }
    });
  }

  //per Service pruefen ob Video in Playlist ist
  isInPlaylist(video) {
    return this.pls.isInPlaylist(video);
  }

  //per Service ein Video in Playlist togglen
  toggleInPlaylist(video) {
    this.pls.toggleInPlaylist(video);
  }

  //einzelnes Video abspielen
  playSingleVideo(video) {

    //aktives Video setzen und dadurch in Liste optisch anpassen
    this.activeVideo = video.file;

    //Playlist bestehend aus 1 Video setzen
    this.pls.setPlaylist([video]);

    //Service aufrufen, der das Video startet
    this.pls.startVideoPlaylist("single");
  }
}