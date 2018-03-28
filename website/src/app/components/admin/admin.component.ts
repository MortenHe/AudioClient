import { Component } from '@angular/core';
import { Video } from '../../config/main-config';
import { VideoService } from '../../services/video.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  //Diagnostic-JSON-Objekt
  diagnostic: any = {};

  //Videoservice injecten
  constructor(private vs: VideoService) { }

  //Videoliste aus Webseite und auf Server vergleichen (um Fehler zu finden)
  checkVideolist() {

    //Service aufrufen, der den Pi mit dem Vergleich beauftragt und Ergebnis auf Webseite anzeigen
    this.vs.sendCheckVideolistRequest().subscribe(
      json_respone => this.diagnostic = json_respone);
  }
}