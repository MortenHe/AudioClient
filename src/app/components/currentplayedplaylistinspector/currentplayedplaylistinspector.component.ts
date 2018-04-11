import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'currentplayedplaylistinspector',
  templateUrl: './currentplayedplaylistinspector.component.html',
  styleUrls: ['./currentplayedplaylistinspector.component.scss']
})

export class CurrentplayedplaylistinspectorComponent implements OnInit {

  //aktuell laufende Playlist als Observable
  currentPlayedPlaylist$: Observable<any>;

  //Service injecten
  constructor(private pls: PlaylistService) { }

  //beim Init
  ngOnInit() {

    //aktuell laufende Playlist per Service abbonieren
    this.currentPlayedPlaylist$ = this.pls.getCurrentPlayedPlaylist();
  }
}