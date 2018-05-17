import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { PlaylistService } from '../../services/playlist.service';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'playercontrol',
  templateUrl: './playercontrol.component.html',
  styleUrls: ['./playercontrol.component.scss']
})

export class PlayercontrolComponent {

  //video vs. audio
  appMode = environment.appMode;

  //aktueller Pausenzustand
  paused: boolean;

  //aktueller Index in Titellsite
  position: number;

  //aktuelle Liste der abgespielten files
  files: any[] = [];

  //Services injecten
  constructor(private bs: BackendService, private pls: PlaylistService) { }

  //Beim Init
  ngOnInit() {

    //aktuellen Pausenzustand abonnieren und in Variable schreiben (fuer CSS-Klasse)
    this.bs.getPaused().subscribe(paused => this.paused = paused);

    //aktuellen Index der Titelliste abonnieren und in Variable schreiben (fuer disabled der Buttons)
    this.bs.getPosition().subscribe(position => this.position = position);

    //aktuelle Liste der Files abbonieren und in Variable schreiben (fuer disabled der Buttons)
    this.bs.getFiles().subscribe(files => this.files = files);
  }

  //Paused-Zustand toggeln
  togglePaused() {
    this.bs.sendMessage({ type: "toggle-paused", value: "" });
  }

  //zum vorherigen / naechten Titel wechseln
  changeSong(increase: boolean) {
    this.bs.sendMessage({ type: "change-song", value: increase });
  }

  //innerhalb des Items spulen
  seek(forward: boolean) {
    this.bs.sendMessage({ type: "seek", value: forward });
  }
}