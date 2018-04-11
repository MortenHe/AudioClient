import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { PlaylistService } from '../../services/playlist.service';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'playercontrol',
  templateUrl: './playercontrol.component.html',
  styleUrls: ['./playercontrol.component.scss']
})

export class PlayercontrolComponent {

  //video vs. audio
  appMode = environment.appMode;

  //Aktuell laufende Playlist als Observable
  currentPlayedPlaylist$: Observable<any>;

  //Services injecten
  constructor(private bs: BackendService, private pls: PlaylistService) { }

  //Beim Init
  ngOnInit() {

    //Aktuell laufende Playlist abbonieren, damit Steuercontrols ein- und ausgeblendet werden koennen
    this.currentPlayedPlaylist$ = this.pls.getCurrentPlayedPlaylist();
  }

  //MM per Service pausieren oder wieder starten oder 30 sec nach links/rechts springen
  controlPlayback(command) {
    this.bs.sendPlaybackControlRequest(command);
  }

  //Video stoppen
  stopPlayback() {

    //aktuell abgespielte Playlist per Service zuruecksetzen
    this.pls.resetCurrentPlayedPlaylist();

    //Video per Service stoppen
    this.bs.sendPlaybackStopRequest();
  }
}