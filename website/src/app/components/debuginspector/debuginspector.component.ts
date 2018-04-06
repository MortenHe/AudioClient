import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { ResultfilterService } from '../../services/resultfilter.service';
import { PlaylistService } from '../../services/playlist.service';
import { Video } from '../../config/main-config';

@Component({
  selector: 'debuginspector',
  templateUrl: './debuginspector.component.html',
  styleUrls: ['./debuginspector.component.scss']
})

export class DebuginspectorComponent implements OnInit {

  //lokale Kopien der Werte
  videos: Video[];
  videoMode: string;
  modeFilter: string;
  searchTerm: string;
  orderField: string;
  reverseOrder: boolean;
  playlist: any[];
  currentPlayedPlaylist: any;

  //Services injecten
  constructor(private vs: VideoService, private fs: ResultfilterService, private pls: PlaylistService) { }

  //beim Init
  ngOnInit() {

    //Werte aus Services abbonieren und fuer Anzeige speichern
    this.vs.getFilteredVideolist().subscribe(videoList => this.videos = videoList);
    this.vs.getVideoMode().subscribe(videoMode => this.videoMode = videoMode);
    this.fs.getModeFilter().subscribe(modeFilter => this.modeFilter = modeFilter);
    this.fs.getSearchTerm().subscribe(searchTerm => this.searchTerm = searchTerm);
    this.fs.getOrderField().subscribe(orderField => this.orderField = orderField);
    this.fs.getReverseOrder().subscribe(reverseOrder => this.reverseOrder = reverseOrder);
    this.pls.getPlaylist().subscribe(playlist => this.playlist = playlist);
    this.pls.getCurrentPlayedPlaylist().subscribe(currentPlayedPlaylist => this.currentPlayedPlaylist = currentPlayedPlaylist);
  }
}