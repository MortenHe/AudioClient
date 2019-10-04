import { Component, OnInit } from '@angular/core';
import { Item } from '../../config/main-config';
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

  //Modus hsp vs. kindermusik
  mode$: BehaviorSubject<string>;

  //Itemliste als Observable. Wird in Template per async pipe ausgegeben
  items$: Observable<Item[]>;

  //Flag ob Tracks angezeigt werden sollen
  showTracks$: Observable<boolean>;

  //Ist Random erlaubt?
  allowRandom$: BehaviorSubject<boolean>;

  //Ist gerade random?
  random: boolean;

  //welches Item in der Liste wurde angeklickt?
  activeItem: string = "";

  //Aktuelle Playlist (kommt von Server)
  files: any[] = [];

  //Modefilter
  modeFilter: string;

  //Services injecten
  constructor(private bs: BackendService, private fs: ResultfilterService, private vcs: ViewControlService) { }

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

    //Random abbonieren
    this.bs.getRandom().subscribe(random => this.random = random);

    //ActiveItem abbonieren
    this.bs.getActiveItem().subscribe(activeItem => {
      this.activeItem = activeItem;
    });

    //Laufende Playlist abbonieren
    this.bs.getFiles().subscribe(files => this.files = files);

    //ModeFilter (bibi, bibi-tina, all,...) abbonieren
    this.fs.getModeFilter().subscribe(modeFilter => this.modeFilter = modeFilter);
  }

  //einzelnes Item abspielen
  playSingleItem(item) {

    //aktuellen Modus auslesen (hsp vs. kindermusik)
    let mode = this.mode$.getValue();

    //aktuellen Wert fuer allowRandom holen
    let allowRandom = this.allowRandom$.getValue();

    //Message an WSS welches Verzeichnis abgespielt werden sollen und ob random erlaubt ist
    this.bs.sendMessage({
      type: "set-playlist",
      value: {
        name: item.name,
        mode: mode,
        path: item.mode + "/" + item.file,
        allowRandom: allowRandom
      }
    });

    //Musiksammlung mit random starten (setzen falls nicht schon random)
    if (mode === 'musik' && !this.random) {
      this.bs.sendMessage({ type: "toggle-random", value: "" });
    }

    //Ansicht auf Playlist umstellen
    this.vcs.setView('playlist');

    //Beim Starten oder Einreihen eines Items das Suchfeld leeren
    this.fs.setSearchTerm("");
  }
}