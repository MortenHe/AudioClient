import { Component, OnInit } from '@angular/core';
import { Item } from '../../config/main-config';
import { PlaylistService } from '../../services/playlist.service';
import { BackendService } from '../../services/backend.service';
import { ResultfilterService } from '../../services/resultfilter.service';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ViewControlService } from '../../services/view-control.service';

@Component({
  selector: 'resultlist',
  templateUrl: './resultlist.component.html',
  styleUrls: ['./resultlist.component.scss']
})

export class ResultlistComponent {

  //audio vs. video
  appMode = environment.appMode;

  //Modus hsp vs. kindermusik
  mode$: BehaviorSubject<string>;

  //Itemliste als Observable. Wird in Template per async pipe ausgegeben
  items$: Observable<Item[]>;

  //Flag ob Tracks angezeigt werden sollen
  showTracks$: Observable<boolean>;

  //Ist Random erlaubt?
  allowRandom$: BehaviorSubject<boolean>;

  //welches Item in der Liste wurde angeklickt?
  activeItem: string = "";

  //Services injecten
  constructor(private pls: PlaylistService, private bs: BackendService, private fs: ResultfilterService, private vcs: ViewControlService) { }

  //beim Init
  ngOnInit() {

    //gefilterte und sortierte Itemliste per Service abbonieren
    this.items$ = this.bs.getFilteredItemlist();

    //flag ob Tracks angezeigt werden abbonieren
    this.showTracks$ = this.fs.getShowTracks();

    //Modus abbonieren
    this.mode$ = this.bs.getMode();

    //AllowRandom abbonieren
    this.allowRandom$ = this.bs.getAllowRandom();

    //ActiveItem abbonieren
    this.bs.getActiveItem().subscribe(activeItem => {
      this.activeItem = activeItem;
    });
  }

  //per Service pruefen ob Item in Playlist ist
  isInPlaylist(item) {
    return this.pls.isInPlaylist(item);
  }

  //per Service ein Item in Playlist togglen
  toggleInPlaylist(item) {
    this.pls.toggleInPlaylist(item);
  }

  //einzelnes Item abspielen
  playSingleItem(item) {

    //aktuellen Modus auslesen (hsp vs. kindermusik)
    let mode = this.mode$.getValue();

    //Bei Audio
    if (this.appMode === "audio") {

      //aktuellen Wert fuer allowRandom holen
      let allowRandom = this.allowRandom$.getValue();

      //Message an WSS welches Verzeichnis abgespielt werden sollen und ob random erlaubt ist
      this.bs.sendMessage({
        type: "set-playlist",
        value: {
          mode: mode,
          path: item.mode + "/" + item.file,
          allowRandom: allowRandom
        }
      });
    }

    //Video-Mode
    else {

      //Playlist-Array mit nur einem Eintrag erstellen
      let files = [{
        "mode": mode,
        "path": item.mode + "/" + item.file,
        "name": item.name
      }];

      //Video-Playlist starten
      this.bs.sendMessage({ type: "set-video-playlist", value: files });
    }

    //Ansicht auf Playlist umstellen
    this.vcs.setView('playlist');
  }
}