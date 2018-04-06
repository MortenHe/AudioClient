import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'picontrol',
  templateUrl: './picontrol.component.html',
  styleUrls: ['./picontrol.component.scss']
})

export class PicontrolComponent {

  //Service injecten
  constructor(private vs: VideoService) { }

  //Pi per Service herunterfahren
  shutdownPi() {
    this.vs.sendShutdownRequest();
  }
}