import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { VideoService } from '../../services/video.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.video-dev';

@Component({
  selector: 'selectvideomode',
  templateUrl: './selectvideomode.component.html',
  styleUrls: ['./selectvideomode.component.scss']
})
export class SelectvideomodeComponent implements OnInit {

  //Liste der Modes
  modes: any[];

  //Form fuer Auswahl des Modus
  selectModeForm;

  //Services injecten
  constructor(private fb: FormBuilder, private vs: VideoService, private router: Router) { }

  //beim Init
  ngOnInit() {

    //Modes aus Config laden
    this.modes = environment.domainModes;

    //Reactive Form fuer Mode-Select erstellen
    this.selectModeForm = this.fb.group({
      "select-mode": ""
    });

    //Wenn sich Wert des Mode-Select aendert
    this.selectModeForm.get("select-mode").valueChanges.subscribe(mode => {

      //zu passender URL navigieren
      this.router.navigate(['/search', mode]);
    }
    );

    //Wen sich der Modus aendert (z.B. URL annavigiert oder Aenderung per Select)
    this.vs.getVideoMode().subscribe(mode => {

      //ausgewaehlten Modus in Select setzen, dabei kein changeevent triggern
      this.selectModeForm.controls["select-mode"].setValue(mode, { emitEvent: false });
    });
  }
}