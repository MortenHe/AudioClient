import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { PlaylistService } from '../../services/playlist.service';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'random-playback',
  templateUrl: './random-playback.component.html',
  styleUrls: ['./random-playback.component.scss']
})

export class RandomPlaybackComponent implements OnInit {

  //Subject um bei destroy von subscribe abzumelden
  private ngUnsubscribe: Subject<any> = new Subject();

  //FormControl fuer Checkbox
  randomPlaybackCheckbox = new FormControl();

  //Services injecten
  constructor(private bs: BackendService, private pls: PlaylistService) { }

  //Beim Init
  ngOnInit() {

    //Aenderungen an random-Wert verfolgen (z.B. wenn per Code Wert geandert wird)
    this.bs.getRandomPlayback().takeUntil(this.ngUnsubscribe).subscribe(bool => {

      //Checkbox-Wert (ohne Event) setzen
      this.randomPlaybackCheckbox.setValue(bool, { 'emitEvent': false })
    });

    //Aenderungen an Checkbox in Template verfolgen
    this.randomPlaybackCheckbox.valueChanges.subscribe(bool => {

      //Wert in Service setzen
      this.bs.setRandomPlayback(bool);

      //Aktuell laufende Playlist ermitteln
      let currentPlayedPlaylist = this.pls.getCurrentPlayedPlaylist().getValue();

      //Wenn gerade eine Playlist laeuft: Playlist laeuft normal -> gleiche Playlist auf random (oder umgekehrt)
      if (currentPlayedPlaylist) {

        //Aktuell laufende Playlist holen
        let playlist = currentPlayedPlaylist.items[0];

        //Playlist bestehend aus 1 Item setzen
        this.pls.setPlaylist([playlist]);

        //Service aufrufen, der das Video startet (dort wird dann das random-Merkmal ausgewertet)
        this.pls.startVideoPlaylist("single");
      }
    })
  }

  //Wenn Komponente zerstoert wird
  ngOnDestroy() {

    //von Subscirpiton abmelden
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}