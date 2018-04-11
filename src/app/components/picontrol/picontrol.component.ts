import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { PicontrolService } from '../../services/picontrol.service';

@Component({
  selector: 'picontrol',
  templateUrl: './picontrol.component.html',
  styleUrls: ['./picontrol.component.scss']
})

export class PicontrolComponent {

  //Service injecten
  constructor(private pcs: PicontrolService) { }

  //Pi per Service herunterfahren
  shutdownPi() {
    this.pcs.sendShutdownRequest();
  }
}