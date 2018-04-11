import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'playlistgenerator',
  templateUrl: './playlistgenerator.component.html',
  styleUrls: ['./playlistgenerator.component.scss']
})

export class PlaylistgeneratorComponent implements OnInit {

  //Playlist, die zusammengestellt wird
  playlist$: Observable<any>;

  //Service injecten
  constructor(private pls: PlaylistService) { }

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

  //Playlist aus ggf. mehreren Items ("multi") per Service starten
  startPlaylist() {
    this.pls.startVideoPlaylist("multi");
  }
}