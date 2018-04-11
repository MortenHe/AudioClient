import { Component, OnInit } from '@angular/core';
import { Item } from '../../config/main-config';
import { PlaylistService } from '../../services/playlist.service';
import { BackendService } from '../../services/backend.service';
import { ResultfilterService } from '../../services/resultfilter.service';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'resultlist',
  templateUrl: './resultlist.component.html',
  styleUrls: ['./resultlist.component.scss']
})

export class ResultlistComponent {

  //audio vs. video
  appMode = environment.appMode;

  //Itemliste als Observable. Wird in Template per async pipe ausgegeben
  items$: Observable<Item[]>;

  //Flag ob Tracks angezeigt werden sollen
  showTracks$: Observable<boolean>;

  //welches Item in der Liste wurde angeklickt?
  activeItem: Item;

  //Services injecten, TODO fs raus
  constructor(private pls: PlaylistService, private bs: BackendService, private fs: ResultfilterService) { }

  //beim Init
  ngOnInit() {

    //gefilterte und sortierte Itemliste per Service abbonieren
    this.items$ = this.bs.getFilteredItemlist();

    //flag ob Tracks angezeigt werden abbonieren
    this.showTracks$ = this.fs.getShowTracks();

    //Aktuell laufende Playlist per Service abbonieren
    this.pls.getCurrentPlayedPlaylist().subscribe(currentPlayedPlaylist => {

      //Wenn es eine Playlist gibt
      if (currentPlayedPlaylist) {

        //und sie durch den Playlistgenerator erstellt wurde
        if (currentPlayedPlaylist.playmode === "multi") {

          //kein Item in der Trefferliste als aktiv anzeigen
          this.activeItem = null;
        }
      }

      //es gibt keine Playlist (mehr)
      else {

        //kein Item in der Trefferliste (mehr) als aktiv anzeigen
        this.activeItem = null;
      }
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

    //aktives Item setzen und dadurch in Liste optisch anpassen
    this.activeItem = item.file;

    //Playlist bestehend aus 1 Item setzen
    this.pls.setPlaylist([item]);

    //Service aufrufen, der das Video startet
    this.pls.startVideoPlaylist("single");
  }
}