import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { PicontrolService } from '../../services/picontrol.service';

@Component({
  selector: 'volume-slider',
  templateUrl: './volume-slider.component.html',
  styleUrls: ['./volume-slider.component.scss']
})

export class VolumeSliderComponent {

  //Services injecten
  constructor(private http: Http, private ps: PicontrolService) { }

  //Bei Ziehen des Sliders
  sliderInput($event) {

    //Volumewert auslesen
    let volume = $event.value;

    //Service fuer Volumeanpassung aufrufen
    this.ps.sendControlVolumeRequest('set-volume', { volume: volume });
  }
}