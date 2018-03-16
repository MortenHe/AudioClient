import { Component } from '@angular/core';
import { VideoService } from './video.service';
import { FormBuilder, FormControl } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  //Form fuer Textsuche und ModeFilterung
  myForm;

  //Filtermoeglichkeiten
  mode_filter = [
    {
      "label": "Alle",
      "value": "*"
    },
    {
      "label": "Bobo",
      "value": "Bobo"
    },
    {
      "label": "Conni",
      "value": "Conni"
    },
    {
      "label": "Janosch",
      "value": "Janosch"
    }
  ];

  //Welches Video ist gerade aktiv (ueber den Dateiname gehen)
  active_video: string;

  //Videoservice und FormBuilder injecten
  constructor(private vs: VideoService, private fb: FormBuilder) {
  }

  //Beim Init
  ngOnInit() {

    //Form anlegen fuer Radio Buttons
    this.myForm = this.fb.group({

      //Suchfeld zu Beginn leer
      "search": "",

      //Zu Beginn den Radio Button "Alle" vorauswaehlen
      "mode": "*"
    });
  }

  //Video abspielen
  playVideo(filename) {

    //aktives Video setzen und dadurch optisch anpassen
    this.active_video = filename;

    //Service aufrufen, der das Video startet
    console.log(filename);
    this.vs.sendVideoPlayRequest(filename);
  }

  //Video stoppen
  stopVideo() {

    //aktives Video wieder zuruecksetzen, weil gerade kein Video mehr laeuft
    this.active_video = null;

    //Service aufrufen, der das Video stoppt
    console.log("stop video");
    this.vs.sendVideoStopRequest();
  }

  //Pi herunterfahren
  shutdownPi() {

    //Service aufrufen, der den Pi herunterfaehrt
    console.log("shutdown video");
    this.vs.sendShutdownRequest();
  }

  //Liste der Videos
  videos: any[] = [
    {
      'mode': 'Janosch',
      'name': 'Janosch - Wolkenzimmerhaus',
      'file': 'janosch-wolkenzimmerhaus.mp4'
    },
    {
      'mode': 'Janosch',
      'name': 'Janosch - Traumstunde für Siebenschläfer',
      'file': 'janosch-siebenschlaefer.mp4'
    },
    {
      'mode': 'Janosch',
      'name': 'Janosch - Riesenparty für den kleinen Tiger',
      'file': 'janosch-riesenparty.mp4'
    },
    {
      'mode': 'Conni',
      'name': 'Conni lernt Rad fahren',
      'file': 'conni-rad.mp4'
    },
    {
      'mode': 'Conni',
      'name': 'Conni geht zelten',
      'file': 'conni-zelten.mp4'
    },
    {
      'mode': 'Bobo',
      'name': 'Bobo baut eine Höhle und Bobo geht in den Zoo',
      'file': 'bobo-hoehle-zoo.mp4'
    },
    {
      'mode': 'Bobo',
      'name': 'Bobo feiert Kindergeburtstag und Bobo auf dem Dachboden',
      'file': 'bobo-kindergeburtstag-dachboden.mp4'
    },
    {
      'mode': 'Bobo',
      'name': 'Bobo beim Kinderarzt und Bobo in der Badewanne',
      'file': 'bobo-kinderarzt-badewanne.mp4'
    },
    {
      'mode': 'Bobo',
      'name': 'Bobo putzt und Bobo kann nicht einschlafen',
      'file': 'bobo-putzt-einschlafen.mp4'
    },
    {
      'mode': 'Bobo',
      'name': 'Bobo auf dem Kinderbauernhof und Bobo am Meer',
      'file': 'bobo-kinderbauernhof-meer.mp4'
    },
    {
      'mode': 'Bobo',
      'name': 'Bobo geht ins Schwimmbad und Bobo und der Hund',
      'file': 'bobo-schwimmbad-hund.mp4'
    },
    {
      'mode': 'Bobo',
      'name': 'Bobo auf dem Spielplatz und Bobo am Bach',
      'file': 'bobo-spielplatz-bach.mp4'
    },
    {
      'mode': 'Bobo',
      'name': 'Bobo lässt einen Drachen steigen und Bobo auf der Kirmes',
      'file': 'bobo-drache-kirmes.mp4'
    },
    {
      'mode': 'Bobo',
      'name': 'Bobo steht früh auf und Bobo macht ein Picknick',
      'file': 'bobo-frueh-picknick.mp4'
    },
    {
      'mode': 'Bobo',
      'name': 'Bobo ist im Garten und Bobo fährt Zug',
      'file': 'bobo-garten-zug.mp4'
    },
    {
      'mode': 'Bobo',
      'name': 'Bobo frühstückt und Bobo geht zur Eisdiele',
      'file': 'bobo-fruehstueck-eisdiele.mp4'
    },
    {
      'mode': 'Bobo',
      'name': 'Bobo im Supermarkt und Bobo baut einen Turm',
      'file': 'bobo-supermarkt-turm.mp4'
    },
    {
      'mode': 'Bobo',
      'name': 'Bobo im Kinderturnen und Bobo und die Babysitterin',
      'file': 'bobo-kinderturnen-babysitterin.mp4'
    }
  ];
}
