import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'resultlistinspector',
  templateUrl: './resultlistinspector.component.html',
  styleUrls: ['./resultlistinspector.component.scss']
})

export class ResultlistinspectorComponent implements OnInit {

  //Anzeige Anzahl der Treffer
  resultListLength: number;

  //Service injecten
  constructor(private vs: VideoService) { }

  //Beim Init
  ngOnInit() {

    //Aenderungen bei Videoliste verfolgen, damit Anzahl der Treffer angepasst werden kann
    this.vs.getFilteredVideolist().subscribe(videoList => this.resultListLength = videoList.length)
  }
}