import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { PlaylistService } from '../../services/playlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment'
import { ResultfilterService } from '../../services/resultfilter.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {

  //video vs. audio
  appMode = environment.appMode;

  //Name der App fuer Ueberschrift (z.B. Video Player (dev))
  envName = environment.envName;

  //ist random playback erlaubt (Kindermusik vs. HSP)?
  allowRandom$;

  //Services und Router injecten
  constructor(private bs: BackendService, private pls: PlaylistService, private route: ActivatedRoute, private router: Router, private fs: ResultfilterService) {
  }

  //Beim Init
  ngOnInit() {

    //Komplettliste der Items in Service laden
    this.bs.loadFullItemlist();

    //Modus abonnieren (fuer Anzeige gewisser Komponenten)
    this.allowRandom$ = this.bs.getAllowRandom();

    //immer wenn sich die Route /serach/kinder -> /search/jahresvideo aendert
    this.route.paramMap.subscribe(params => {

      //Modus (kinder vs. jahresvideo) aus URL-Parameter auslesen
      let mode = params.get('mode');

      //Modes, die es in der der Config gibt
      let domainModes = environment.domainModes.map(domainMode => { return domainMode.id });

      //Wenn es diesen Modus nicht gibt
      if (domainModes.indexOf(mode) === -1) {

        //zu 1. Modus aus Config navigieren
        this.router.navigate(['/search', environment.domainModes[0].id]);
      }

      //Modus per Service setzen
      this.bs.setMode(mode);

      //Playlist per Service zuruecksetzen
      this.pls.resetPlaylist();
    });
  }
}