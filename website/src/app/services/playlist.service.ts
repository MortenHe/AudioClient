import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

//Zeit-Formattierung
import { add, str } from 'timelite'
import { VideoService } from './video.service';

@Injectable()
export class PlaylistService {

  //Playlist wird von Service verwaltet
  playlist = [];

  //Subject fuer Playlist, das andere Komponenten subscriben koennen
  playlistSubject: Subject<any []> = new Subject();

  //Subject fuer aktuell laufende Playlist, das andere Komponenten subscriben koennen
  curretPlayedPlaylistSubject: Subject<any> = new Subject();

  //Service injecten
  constructor(private vs: VideoService) { }

  //Playlist zurueckgeben
  getPlaylist(): Subject<any> {
    return this.playlistSubject;
  }

  //aktuell laufende Playlist zurueckgeben
  getCurrentPlayedPlaylist(): Subject<any> {
    return this.curretPlayedPlaylistSubject;
  }

  //Pruefen ob Video in Playlist ist
  isInPlaylist(video) {
    return this.playlist.indexOf(video) > -1;
  }

  //Playlist setzen
  setPlaylist(playlist) {
    
    //Playlist setzen und Wert in Subject schieben
    this.playlist = playlist;
    this.playlistSubject.next(this.playlist)
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

      //Video in Playlist einfuegen und in Subject schieben
      this.playlist.push(video);
      this.playlistSubject.next(this.playlist);
    }
  }

  //Laenge der Playlist ermittlen
  getPlaylistLength() {
        
    //Laengen-Merkmal aus Playlist-Array extrahieren und addieren
    let playlist_length_array = add(this.playlist.map(item => item.length));

    //Ergebnis als String: [0, 5, 12] -> "00:05:12"
    let playlist_length = str(playlist_length_array);

    //formattieren String (ohne fuehrende 0) ausgeben: "00:05:12" -> "5:12"
    return playlist_length;
  }

  //aktuell laufende Playlist zuruecksetzen
  resetCurrentPlayedPlaylist() {
    this.curretPlayedPlaylistSubject.next(null);
  }

  //Video(s) starten
  startVideoPlaylist(videoMode) {

    //VideoPlaylist setzen mit Array der Namen der Video + Laenge der Playlist
    let currentPlayedPlaylist = {
      items: this.playlist.map(item => item.name),
      length: this.getPlaylistLength()
    }

    //aktuell laufende Playlist in Subject scheiben
    this.curretPlayedPlaylistSubject.next(currentPlayedPlaylist);

    //Liste der Dateinname fuer Serveranfrage
    let videoList = this.playlist.map(item => {
      return item.mode + "/" + item.file
    });

    //Playlist leeren und in Subject schieben
    this.playlist = [];
    this.playlistSubject.next(this.playlist);

    //Service aufrufen, der das/die Video(s) startet
    this.vs.sendVideoPlayRequest(videoMode, videoList);
  }
}