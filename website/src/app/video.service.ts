import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class VideoService {

  //Http Service injekten
  constructor(private http: Http) {
  }

  //Anfrage an Proxy schicken, damit dieser ein Video startet
  sendVideoPlayRequest(filename) {
    console.log("Play file" + filename);

    //Dateiname mitschicken bei HTTP-Request
    this.http.get("http://192.168.0.150/play_video.php?filename=" + filename).subscribe();
  }

  //Anfrage an Proxy schicken, damit diese das Videoplayback stoppt
  sendVideoStopRequest(): any {
    console.log("Stop video");

    //HTTP-Request um Video zu stoppen
    this.http.get("http://192.168.0.150/stop_video.php").subscribe();
  }

  //Anfrage an Proxy schicken, damit der Pi heruntergefahren wird
  sendShutdownRequest(): any {
    console.log("Shutdown pi");

    //HTTP-Request um Pi herunterzufahren
    this.http.get("http://192.168.0.150/shutdown_pi.php").subscribe();
  }
}