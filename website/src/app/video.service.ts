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
    this.http.get("http://definitely-fu.de/test/test.php?filename=" + filename).subscribe();
  }
}