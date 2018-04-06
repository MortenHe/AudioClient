import { Component } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'playercontrol',
  templateUrl: './playercontrol.component.html',
  styleUrls: ['./playercontrol.component.scss']
})

export class PlayercontrolComponent {

  //Aktuell laufende Playlist
  currentPlayedPlaylist: any;

  //Services injecten
  constructor(private vs: VideoService, private pls: PlaylistService) { }

  //Beim Init
  ngOnInit() {

    //Aktuell laufende Playlist abbonieren, damit Steuercontrols ein- und ausgeblendet werden koennen
    this.pls.getCurrentPlayedPlaylist().subscribe(currentPlayedPlaylist => this.currentPlayedPlaylist = currentPlayedPlaylist);
  }

  //Video per Service pausieren oder wieder starten oder 30 sec nach links/rechts springen
  controlVideo(command) {
    this.vs.sendVideoControlRequest(command);
  }

  //Video stoppen
  stopVideo() {

    //aktuell abgespielte Playlist per Service zuruecksetzen
    this.pls.resetCurrentPlayedPlaylist();

    //Video per Service stoppen
    this.vs.sendVideoStopRequest();
  }
}