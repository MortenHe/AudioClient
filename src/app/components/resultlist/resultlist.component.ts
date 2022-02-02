import { Component, OnInit } from '@angular/core';
import { Item } from '../../config/main-config';
import { BackendService } from '../../services/backend.service';
import { ResultfilterService } from '../../services/resultfilter.service';
import { Observable } from 'rxjs';
import { ViewControlService } from '../../services/view-control.service';

@Component({
  selector: 'resultlist',
  templateUrl: './resultlist.component.html',
  styleUrls: ['./resultlist.component.scss']
})

export class ResultlistComponent {

  //Modus hsp vs. kindermusik
  mode: string;

  //Itemliste als Observable. Wird in Template per async pipe ausgegeben
  items$: Observable<Item[]>;

  //welches Item in der Liste wurde angeklickt?
  activeItem: string = "";

  //Modefilter
  modeFilter: string;

  //Suchterm fuer Markierung der Trefferliste
  searchTerm: string;

  //Services injecten
  constructor(private bs: BackendService, private fs: ResultfilterService, private vcs: ViewControlService) { }

  //beim Init
  ngOnInit() {

    //gefilterte und sortierte Itemliste per Service abbonieren
    this.items$ = this.bs.getFilteredItemlist();

    //Modus abbonieren
    this.bs.getMode().subscribe(mode => {
      this.mode = mode;
    });

    //ActiveItem abbonieren
    this.bs.getActiveItem().subscribe(activeItem => {
      this.activeItem = activeItem;
    });

    //ModeFilter (bibi, bibi-tina, all,...) abbonieren
    this.fs.getModeFilter().subscribe(modeFilter => this.modeFilter = modeFilter);

    //Suchterm abbonieren
    this.fs.getSearchTerm().subscribe(searchTerm => this.searchTerm = searchTerm);
  }

  //einzelnes Item abspielen
  playSingleItem(item) {

    //Message an WSS welches Verzeichnis abgespielt werden soll
    this.bs.sendMessage({
      type: "set-playlist",
      value: {
        name: item.name,
        mode: this.mode,
        path: item.mode + "/" + item.file
      }
    });

    //Ansicht auf Playlist umstellen
    this.vcs.setView('playlist');

    //Beim Starten oder Einreihen eines Items das Suchfeld leeren
    this.fs.setSearchTerm("");
  }
}