import { Component } from '@angular/core';
import { PicontrolService } from '../../services/picontrol.service';

@Component({
  selector: 'volume-control',
  templateUrl: './volume-control.component.html',
  styleUrls: ['./volume-control.component.scss']
})

export class VolumeControlComponent {

  //Service injecten
  constructor(private ps: PicontrolService) { }

  //Command an Service weiterreichen, wenn keine params kommen, leeres Objekt mitliefern
  controlVolume(command, params = {}) {
    this.ps.sendControlVolumeRequest(command, params);
  }

}
