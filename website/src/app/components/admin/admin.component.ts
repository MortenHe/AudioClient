import { Component } from '@angular/core';
import { VIDEOLIST, Video } from '../../config/main';
import { VideoService } from '../../services/video.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  //Kindervideos vs. Jahresvideos
  video_mode;

  //Diagnostic-JSON-Objekt
  diagnostic: any = {};

  //Videoservice injecten
  constructor(private vs: VideoService, private route: ActivatedRoute) { }

  //Beim Init
  ngOnInit() {

    //paramMap liefert Oberservable
    this.route.paramMap.subscribe(params => {

      //Video-Modus (kinder vs. jahresvideo) aus URL-Parameter auslesen
      this.video_mode = params.get('video_mode');

      //Wenn kein korrekter Parameter geliefert wurde
      if (VIDEOLIST[this.video_mode] === undefined) {

        //Kindervideos als Modus
        this.video_mode = "kinder";
      }

      //Diagnostics zuruecksetzen
      this.diagnostic = {};
    });
  }

  //Videoliste aus Webseite und auf Server vergleichen (um Fehler zu finden)
  checkVideolist() {

    //Liste der Dateinamen aus Config
    let video_list = (VIDEOLIST[this.video_mode].videos.map(item => {
      return item.mode + "/" + item.file
    }));

    //Service aufrufen, der den Pi mit dem Vergleich beauftragt und Ergebnis auf Webseite anzeigen
    this.vs.sendCheckVideolistReqeuist(this.video_mode, video_list).subscribe(
      json_respone => this.diagnostic = json_respone);
  }
}