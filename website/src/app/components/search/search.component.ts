import { Component } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { PlaylistService } from '../../services/playlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VIDEO_MODES } from '../../config/main-config'

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

      //Video-Modes, die es in der der Config gibt
      let configVideoModes = VIDEO_MODES.map(video_mode => {return video_mode.id});

      //Wenn es diesen Video-Modus nicht gibt
      if (configVideoModes.indexOf(videoMode) === -1) {

        //zu 1. Video-Modus aus Config navigieren
        this.router.navigate(['/search', VIDEO_MODES[0].id]);
      }

      //Videomodus per Service setzen
      this.vs.setVideoMode(videoMode);

      //Playlist per Service zuruecksetzen
      this.pls.resetPlaylist();
    });
  }
}