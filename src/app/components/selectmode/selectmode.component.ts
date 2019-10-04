import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ViewControlService } from '../../services/view-control.service';

@Component({
  selector: 'selectmode',
  templateUrl: './selectmode.component.html',
  styleUrls: ['./selectmode.component.scss']
})
export class SelectmodeComponent implements OnInit {

  //aktiver Modus
  activeMode: string;

  //Liste der Modes (kindervideo, jahresvideo)
  modes: any[];

  //Services injecten
  constructor(private bs: BackendService, private router: Router, private vcs: ViewControlService) { }

  //beim Init
  ngOnInit() {

    //Modes aus Config laden
    this.modes = environment.domainModes;

    //1. Modus als aktiv setzen
    this.activeMode = this.modes[0];

    //Wenn sich der Modus aendert (z.B. URL annavigiert oder Aenderung per Select), Modus merken
    this.bs.getMode().subscribe(mode => {
      this.activeMode = mode;
    });
  }

  //Wenn Modus gesetzt wird
  setMode(mode) {

    //zu passender URL navigieren
    this.router.navigate(['/search', mode]);

    //Auf Suche-View umschalten
    this.vcs.setView('search');
  }
}