import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { VideoService } from '../../services/video.service';
import { Router } from '@angular/router';
import { VIDEO_MODES } from '../../config/main-config';

@Component({
  selector: 'selectvideomode',
  templateUrl: './selectvideomode.component.html',
  styleUrls: ['./selectvideomode.component.scss']
})
export class SelectvideomodeComponent implements OnInit {

  //Liste der Video-Modes
  videoModes: any[];

  //Form fuer Auswahl des Videomodus
  selectVideomodeForm;

  //Services injecten
  constructor(private fb: FormBuilder, private vs: VideoService, private router: Router) { }

  //beim Init
  ngOnInit() {

    //Video-Modes aus Config laden
    this.videoModes = VIDEO_MODES;

    //Reactive Form fuer Videomode-Select erstellen
    this.selectVideomodeForm = this.fb.group({
      "select-video-mode": ""
    });

    //Wenn sich Wert des Videomode-Select aendert
    this.selectVideomodeForm.get("select-video-mode").valueChanges.subscribe(mode => {

        //zu passender URL navigieren
        this.router.navigate(['/search', mode]);
      }
    );

    //Wen sich der Videomodus aendert (z.B. URL annavigiert oder Aenderung per Select)
    this.vs.getVideoMode().subscribe(videoMode => {
      
      //ausgewaehlten Video-Modus in Select setzen, dabei kein changeevent triggern
      this.selectVideomodeForm.controls["select-video-mode"].setValue(videoMode, { emitEvent: false });
    });
  }
}