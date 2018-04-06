import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'playlistgenerator',
  templateUrl: './playlistgenerator.component.html',
  styleUrls: ['./playlistgenerator.component.scss']
})

export class PlaylistgeneratorComponent implements OnInit {

  //Playlist, die zusammengestellt wird
  playlist;

  //Service injecten
  constructor(private pls: PlaylistService) { }

  //beim Init
  ngOnInit() {

    //Aenderungen an Playlist per Service abbonieren
    this.pls.getPlaylist().subscribe(playlist => this.playlist = playlist)
  }

  //per Service Laenge der Playlist ermitteln
  getPlaylistLength() {
    return this.pls.getPlaylistLength();
  }

  //per Service Video in Playlist toggeln
  toggleInPlaylist(video) {
    this.pls.toggleInPlaylist(video);
  }

  //Playlist aus ggf. mehreren Videos ("multi") per Service starten
  startVideoPlaylist() {
    this.pls.startVideoPlaylist("multi");
  }
}