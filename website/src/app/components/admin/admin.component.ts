import { Component } from '@angular/core';
import { Video } from '../../config/main-config';
import { VideoService } from '../../services/video.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(private vs: VideoService, private route: ActivatedRoute, private router: Router) { }

  //Beim Init
  ngOnInit() {

    //paramMap liefert Oberservable
    this.route.paramMap.subscribe(params => {

      //Video-Modus (kinder vs. jahresvideo) aus URL-Parameter auslesen
      this.video_mode = params.get('video_mode');

      //Videoliste holen aus JSON
      this.vs.getVideolist().subscribe(VIDEOLIST => {

        //Wenn kein korrekter Parameter geliefert wurde
        if (VIDEOLIST[this.video_mode] === undefined) {

          //zu Kinder-Admin navigieren
          this.router.navigate(['/admin/kinder']);
        }
      });

      //Diagnostics zuruecksetzen
      this.diagnostic = {};
    });
  }

  //Videoliste aus Webseite und auf Server vergleichen (um Fehler zu finden)
  checkVideolist() {

    //Service aufrufen, der den Pi mit dem Vergleich beauftragt und Ergebnis auf Webseite anzeigen
    this.vs.sendCheckVideolistRequest(this.video_mode).subscribe(
      json_respone => this.diagnostic = json_respone);
  }
}