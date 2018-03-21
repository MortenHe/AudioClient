import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//Video-Liste importieren
import { PROXY_URL, VIDEOS, Video } from '../config/main'

@Injectable()
export class VideoService {

    //URL wo die Proxyskripte liegen aus config laden
    proxyUrl = PROXY_URL

    //Http Service injekten
    constructor(private http: Http) {
    }

    //Anfrage an Proxy schicken, damit dieser ein Video / Liste von Videos startet
    sendVideoPlayRequest(filename_string) {

        //Dateiname(n) mitschicken bei HTTP-Request
        this.http.get(this.proxyUrl + "start_playlist.php?filename_string=" + filename_string).subscribe();
    }

    //Anfrage an Proxy schicken, damit dieser das Videoplayback stoppt
    sendVideoStopRequest(): any {

        //HTTP-Request um Video zu stoppen
        this.http.get(this.proxyUrl + "stop_video.php").subscribe();
    }

    //Anfrage an Proxy schicken, damit der Pi heruntergefahren wird
    sendShutdownRequest(): any {

        //HTTP-Request um Pi herunterzufahren
        this.http.get(this.proxyUrl + "shutdown_pi.php").subscribe();
    }

    //Videoliste aus Webseite und auf Server vergleichen
    sendCheckVideolistReqeuist(video_string): Observable<any> {

        //HTTP-Reqeust fuer Vergleich der Videolisten
        return this.http.post(this.proxyUrl + "check_videolist.php", JSON.stringify({ video_string: video_string })).map(response => response.json() as any);
    }
}