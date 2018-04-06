import { Component } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { PlaylistService } from '../../services/playlist.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {

  //Services und Router injecten
  constructor(private vs: VideoService, private pls: PlaylistService, private route: ActivatedRoute, private router: Router) {
  }

  //Beim Init
  ngOnInit() {

    //Komplettliste der Videos in Service laden
    this.vs.loadFullVideolist();

    //immer wenn sich die Route /serach/kinder -> /search/jahresvideo aendert
    this.route.paramMap.subscribe(params => {

      //Video-Modus (kinder vs. jahresvideo) aus URL-Parameter auslesen
      let videoMode = params.get('videoMode');

      //TODO fehlerhafte Parameter abfangen

      //Videomodus per Service setzen
      this.vs.setVideoMode(videoMode);

      //Playlist per Service zuruecksetzen
      this.pls.resetPlaylist();
    });
  }

  //Pi per Service herunterfahren
  shutdownPi() {
    this.vs.sendShutdownRequest();
  }
}