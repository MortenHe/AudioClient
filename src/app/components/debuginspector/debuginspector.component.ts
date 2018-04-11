import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { ResultfilterService } from '../../services/resultfilter.service';
import { PlaylistService } from '../../services/playlist.service';
import { Item } from '../../config/main-config';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'debuginspector',
  templateUrl: './debuginspector.component.html',
  styleUrls: ['./debuginspector.component.scss']
})

export class DebuginspectorComponent implements OnInit {

  //Observables fuer Anzeige
  items$: Observable<Item[]>;
  videoMode: string;
  modeFilter: string;
  searchTerm: string;
  orderField: string;
  reverseOrder: boolean;
  playlist: any[];
  currentPlayedPlaylist: any;

  //Env-Werte
  appMode = environment.appMode;
  domainModes = environment.domainModes;
  envName = environment.envName;
  production = environment.production;
  proxyUrl = environment.proxyUrl;

  //Services injecten
  constructor(private vs: VideoService, private fs: ResultfilterService, private pls: PlaylistService) { }

  //beim Init
  ngOnInit() {

    //Werte aus Services abbonieren und fuer Anzeige speichern
    this.items$ = this.vs.getFilteredItemlist();
    this.vs.getMode().subscribe(videoMode => this.videoMode = videoMode);
    this.fs.getModeFilter().subscribe(modeFilter => this.modeFilter = modeFilter);
    this.fs.getSearchTerm().subscribe(searchTerm => this.searchTerm = searchTerm);
    this.fs.getOrderField().subscribe(orderField => this.orderField = orderField);
    this.fs.getReverseOrder().subscribe(reverseOrder => this.reverseOrder = reverseOrder);
    this.pls.getPlaylist().subscribe(playlist => this.playlist = playlist);
    this.pls.getCurrentPlayedPlaylist().subscribe(currentPlayedPlaylist => this.currentPlayedPlaylist = currentPlayedPlaylist);
  }
}