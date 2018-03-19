import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class VideoService {

  //Http Service injekten
  constructor(private http: Http) {
  }

  //Anfrage an Proxy schicken, damit dieser ein Video / Liste von Videos startet
  sendVideoPlayRequest(filename_string) {

    //Dateiname(n) mitschicken bei HTTP-Request
    this.http.get("http://192.168.0.150/start_playlist.php?filename_string=" + filename_string).subscribe();
  }

  //Anfrage an Proxy schicken, damit dieser das Videoplayback stoppt
  sendVideoStopRequest(): any {

    //HTTP-Request um Video zu stoppen
    this.http.get("http://192.168.0.150/stop_video.php").subscribe();
  }

  //Anfrage an Proxy schicken, damit der Pi heruntergefahren wird
  sendShutdownRequest(): any {

    //HTTP-Request um Pi herunterzufahren
    this.http.get("http://192.168.0.150/shutdown_pi.php").subscribe();
  }
}