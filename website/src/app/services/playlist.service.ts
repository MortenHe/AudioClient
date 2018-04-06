import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { VideoService } from './video.service';
import { add, str } from 'timelite'

@Injectable()

export class PlaylistService {

  //Playlist wird von Service verwaltet
  playlist = [];

  //BS fuer Playlist, das andere Komponenten subscriben koennen
  playlistBS: BehaviorSubject<any[]> = new BehaviorSubject([]);

  //BS fuer aktuell laufende Playlist, das andere Komponenten subscriben koennen
  curretPlayedPlaylistBS: BehaviorSubject<any> = new BehaviorSubject(null);

  //Service injecten
  constructor(private vs: VideoService) { }

  //Playlist zurueckgeben
  getPlaylist(): BehaviorSubject<any> {
    return this.playlistBS;
  }

  //aktuell laufende Playlist zurueckgeben
  getCurrentPlayedPlaylist(): BehaviorSubject<any> {
    return this.curretPlayedPlaylistBS;
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

  //aktuell laufende Playlist zuruecksetzen
  resetCurrentPlayedPlaylist() {
    this.curretPlayedPlaylistBS.next(null);
  }

  //Video(s) starten
  startVideoPlaylist(playmode) {

    //VideoPlaylist setzen mit Array der Namen der Video + Laenge der Playlist
    let currentPlayedPlaylist = {
      playmode: playmode,
      items: this.playlist.map(item => item.name),
      length: this.getPlaylistLength()
    }

    //aktuell laufende Playlist in BS schieben
    this.curretPlayedPlaylistBS.next(currentPlayedPlaylist);

    //Liste der Dateinname fuer Serveranfrage
    let videoList = this.playlist.map(item => {
      return item.mode + "/" + item.file
    });

    //Playlist leeren
    this.resetPlaylist();

    //Service aufrufen, der das/die Video(s) startet
    this.vs.sendVideoPlayRequest(videoList);
  }
}