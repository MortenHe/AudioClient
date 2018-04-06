import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'currentplayedplaylistinspector',
  templateUrl: './currentplayedplaylistinspector.component.html',
  styleUrls: ['./currentplayedplaylistinspector.component.scss']
})
export class CurrentplayedplaylistinspectorComponent implements OnInit {

  //aktuell laufende Playlist
  currentPlayedPlaylist;

  //Service injecten
  constructor(private pls: PlaylistService) { }

  //beim Init
  ngOnInit() {

    //aktuell laufende Playlist per Service abbonieren
    this.pls.getCurrentPlayedPlaylist().subscribe(currentPlayedPlaylist => {
      this.currentPlayedPlaylist = currentPlayedPlaylist;
    });
  }
}