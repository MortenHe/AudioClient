import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'currentplayedplaylistinspector',
  templateUrl: './currentplayedplaylistinspector.component.html',
  styleUrls: ['./currentplayedplaylistinspector.component.scss']
})

export class CurrentplayedplaylistinspectorComponent implements OnInit {

  //aktuelle Zeit des laufenden Items
  time: string = "";

  //Liste der Dateien, die abgespielt werden
  files$: Subject<any[]>;

  //aktueller Index in Titelliste
  position: number;

  //temp. Wert, wohin gerade gesprungen werden soll
  jumpPosition: number = -1;

  //Service injecten
  constructor(private pls: PlaylistService, private bs: BackendService) { }

  //beim Init
  ngOnInit() {

    //akutelle Zeit per Service abbonieren und in Variable schreiben
    this.bs.getTime().subscribe(time => this.time = time);

    //Liste des aktuellen laufenden Files abbonieren
    this.files$ = this.bs.getFiles();

    //aktuellen Index in Titelliste abbonieren und in Variable schreiben (fuer CSS-Klasse)
    this.bs.getPosition().subscribe(position => {
      this.position = position;

      //temp. Sprungwert (fuer optische Darstellung) wieder zuruecksetzen
      this.jumpPosition = -1;
    });
  }

  //zu gewissem Titel in Playlist springen
  jumpTo(position: number) {

    //Befehl an WSS schicken
    this.bs.sendMessage({ type: "jump-to", value: position });

    //Wenn zu einem anderen Titel gesprungen werden soll
    if (this.position !== position) {

      //bei diesem Eintrag einen Spinner anzeigen, bis der Titel geladen wurde
      this.jumpPosition = position;
    }
  }
}