import { Component } from '@angular/core';
import { Item } from '../../config/main-config';
import { VideoService } from '../../services/video.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  //Diagnostic-JSON-Objekt Observable
  diagnostic$: Observable<any>;

  //Videoservice injecten
  constructor(private vs: VideoService) { }

  //Itemliste aus Webseite und auf Server vergleichen (um Fehler zu finden)
  checkItemlist() {

    //Service aufrufen, der den Pi mit dem Vergleich beauftragt und Ergebnis auf Webseite anzeigen
    this.diagnostic$ = this.vs.sendCompareItemlistsRequest();
  }
}