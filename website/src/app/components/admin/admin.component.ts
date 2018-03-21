import { Component } from '@angular/core';
import { VIDEOS } from '../../config/main';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  //Diagnostic-JSON-Objekt
  diagnostic: any = {};

  //Videoservice injecten
  constructor(private vs: VideoService) { }

  //Videoliste aus Webseite und auf Server vergleichen (um Fehler zu finden)
  checkVideolist() {

    //Liste der Dateinamen aus Config als komma-sep. String
    let video_string = (VIDEOS.map(item => item.file).join(","));

    //Service aufrufen, der den Pi mit dem Vergleich beauftragt
    this.vs.sendCheckVideolistReqeuist(video_string).subscribe(
      json_respone => this.diagnostic = json_respone);
  }
}