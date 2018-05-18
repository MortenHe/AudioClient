import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BackendService } from './backend.service';
import { add, str } from 'timelite'

@Injectable()

export class PlaylistService {

  //Playlist wird von Service verwaltet
  playlist = [];

  //BS fuer Playlist, das andere Komponenten subscriben koennen
  playlistBS: BehaviorSubject<any[]> = new BehaviorSubject([]);

  //Service injecten
  constructor(private bs: BackendService) { }

  //Playlist zurueckgeben
  getPlaylist(): BehaviorSubject<any> {
    return this.playlistBS;
  }


  //Pruefen ob Video in Playlist ist
  isInPlaylist(video) {
    return this.playlist.indexOf(video) > -1;
  }

  //Playlist setzen
  setPlaylist(playlist) {

    //Playlist setzen und Wert in BS schieben
    this.playlist = playlist;
    this.playlistBS.next(this.playlist)
  }

  //Video in Playlist einfuegen oder daraus entfernen
  toggleInPlaylist(video) {

    //Wenn das Video schon in der Playlist ist
    if (this.isInPlaylist(video)) {

      //Index des Videos in Playlist ermitteln
      const index: number = this.playlist.indexOf(video);

      //Wenn Video in Playlist ist
      if (index !== -1) {

        //Video aus Playlist entfernen
        this.playlist.splice(index, 1);
      }
    }

    //Video ist noch nicht in Playlist
    else {

      //Video in Playlist einfuegen und in BS schieben
      this.playlist.push(video);
      this.playlistBS.next(this.playlist);
    }
  }

  //Laenge der Playlist ermittlen
  getPlaylistLength() {

    //Laengen-Merkmal aus Playlist-Array extrahieren und addieren
    let playlist_length_array = add(this.playlist.map(item => item.length));

    //Ergebnis als String: [0, 5, 12] -> "00:05:12" liefern
    return str(playlist_length_array);
  }

  //Playlist zuruecksetzen
  resetPlaylist() {

    //Playlist leeren und in BS schieben
    this.playlist = [];
    this.playlistBS.next(this.playlist);
  }
}