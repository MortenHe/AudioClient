import { Component } from '@angular/core';
import { Item } from '../../config/main-config';
import { BackendService } from '../../services/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  //Name der App fuer Ueberschrift (z.B. Video Player (dev))
  envName = environment.envName;

  //Diagnostic-JSON-Objekt Observable
  diagnostic$: Observable<any>;

  //Service injecten
  constructor(private bs: BackendService) { }

  //Itemliste aus Webseite und auf Server vergleichen (um Fehler zu finden)
  checkItemlist() {

    //Service aufrufen, der den Pi mit dem Vergleich beauftragt und Ergebnis auf Webseite anzeigen
    this.diagnostic$ = this.bs.sendCompareItemlistsRequest();
  }
}