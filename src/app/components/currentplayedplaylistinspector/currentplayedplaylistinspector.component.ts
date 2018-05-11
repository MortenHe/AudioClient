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

  //Service injecten
  constructor(private pls: PlaylistService, private bs: BackendService) { }

  //beim Init
  ngOnInit() {

    //akutelle Zeit per Service abbonieren und in Variable schreiben
    this.bs.getTime().subscribe(time => this.time = time);

    //Liste des aktuellen laufenden Files abbonieren
    this.files$ = this.bs.getFiles();

    //aktuellen Index in Titelliste abbonieren und in Variable schreiben (fuer CSS-Klasse)
    this.bs.getPosition().subscribe(position => this.position = position);
  }
}