import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'picontrol',
  templateUrl: './picontrol.component.html',
  styleUrls: ['./picontrol.component.scss']
})

export class PicontrolComponent {

  //Service injecten
  constructor(private bs: BackendService) { }

  //Pi per Service herunterfahren
  shutdownPi() {
    this.bs.sendMessage({ type: "shutdown", value: "" });
  }
}