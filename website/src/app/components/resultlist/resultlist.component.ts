import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../../config/main-config';
import { PlaylistService } from '../../services/playlist.service';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'resultlist',
  templateUrl: './resultlist.component.html',
  styleUrls: ['./resultlist.component.scss']
})
export class ResultlistComponent {

  //Videoliste
  @Input() videos: Video[];

  //Video-Modus als Input
  @Input() videoMode: string;

  //Modus-Filter als Input
  @Input() modeFilter: string;

  //Suchfeld-Filter als Input
  @Input() searchFilter: string;

  //Sortierfeld als Input
  @Input() orderField: string;

  //Umgekehrte Sortierung als Input
  @Input() reverseOrder: string;

  //welches Video in der Liste wurde angeklickt?
  activeVideo: Video;

  //Services injecten
  constructor(private pls: PlaylistService, private vs: VideoService) { }

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

    //aktives Video setzen und dadurch optisch anpassen
    this.activeVideo = video.file;

    //Playlist bestehend aus 1 Video setzen
    this.pls.setPlaylist([video]);

    //Service aufrufen, der das Video startet
    this.pls.startVideoPlaylist(this.videoMode);
  }
}