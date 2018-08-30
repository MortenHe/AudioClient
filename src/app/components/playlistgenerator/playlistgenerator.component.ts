import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BackendService } from '../../services/backend.service';
import { ViewControlService } from '../../services/view-control.service';

@Component({
  selector: 'playlistgenerator',
  templateUrl: './playlistgenerator.component.html',
  styleUrls: ['./playlistgenerator.component.scss']
})

export class PlaylistgeneratorComponent implements OnInit {

  //Playlist, die zusammengestellt wird
  playlist$: BehaviorSubject<any>;

  //Services injecten
  constructor(private pls: PlaylistService, private bs: BackendService, private vcs: ViewControlService) { }

  //beim Init
  ngOnInit() {

    //Aenderungen an Playlist per Service abbonieren
    this.playlist$ = this.pls.getPlaylist();
  }

  //per Service Laenge der Playlist ermitteln
  getPlaylistLength() {
    return this.pls.getPlaylistLength();
  }

  //per Service Item in Playlist toggeln
  toggleInPlaylist(item) {
    this.pls.toggleInPlaylist(item);
  }

  //Playlist starten
  startPlaylist() {

    //kinder vs. jahresvideo
    let mode = this.bs.getMode().getValue();

    //Dateien sammeln
    let files = [];

    //Aktuelle Playlist holen
    let playlist = this.playlist$.getValue();

    //Ueber Files der Playlist gehen
    playlist.forEach(videoObj => {

      //Objekt mit passenden Infos erstellen
      files.push({
        "path": videoObj.mode + "/" + videoObj.file,
        "name": videoObj.name,
        "mode": mode
      });
    });

    //Video-Playlist starten
    this.bs.sendMessage({ type: "set-video-playlist", value: files });

    //generierte Playlist wieder leeren
    this.pls.resetPlaylist();

    //Ansicht auf Playlist umstellen
    this.vcs.setView('playlist');
  }
}