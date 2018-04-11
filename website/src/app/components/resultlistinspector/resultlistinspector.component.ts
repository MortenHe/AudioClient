import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'resultlistinspector',
  templateUrl: './resultlistinspector.component.html',
  styleUrls: ['./resultlistinspector.component.scss']
})

export class ResultlistinspectorComponent implements OnInit {

  //Trefferliste als Observable
  items$: Observable<any>;

  //Service injecten
  constructor(private vs: VideoService) { }

  //Beim Init
  ngOnInit() {

    //Aenderungen bei Videoliste verfolgen, damit Anzahl der Treffer angepasst werden kann
    this.items$ = this.vs.getFilteredItemlist();
  }
}