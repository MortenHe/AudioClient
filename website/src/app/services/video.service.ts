import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//Video-Liste importieren
import { PROXY_URL } from '../config/main'

@Injectable()
export class VideoService {

    //URL wo die Proxyskripte liegen aus config laden
    proxyUrl = PROXY_URL

    //Http Service injekten
    constructor(private http: Http) {
    }

    //Anfrage an Proxy schicken, damit dieser ein Video / Liste von Videos startet
    sendVideoPlayRequest(video_mode, video_list) {

        //Dateiname(n) und Modus mitschicken bei HTTP-Request
        this.http.post(this.proxyUrl + "start_playlist.php", JSON.stringify({ video_mode: video_mode, video_list: video_list })).subscribe();
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
    sendCheckVideolistReqeuist(video_mode, video_list): Observable<any> {

        //HTTP-Reqeust fuer Vergleich der Videolisten
        return this.http.post(this.proxyUrl + "check_videolist.php", JSON.stringify({ video_mode: video_mode, video_list: video_list })).map(response => response.json() as any);
    }
}