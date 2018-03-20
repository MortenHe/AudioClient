import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

//Video-Liste importieren
import { VIDEOS, Video } from '../config/video'

@Injectable()
export class VideoService {

    //Http Service injekten
    constructor(private http: Http) {
    }

    //Anfrage an Proxy schicken, damit dieser ein Video / Liste von Videos startet
    sendVideoPlayRequest(filename_string) {

        //Dateiname(n) mitschicken bei HTTP-Request
        this.http.get("http://192.168.0.150/proxy/start_playlist.php?filename_string=" + filename_string).subscribe();
    }

    //Anfrage an Proxy schicken, damit dieser das Videoplayback stoppt
    sendVideoStopRequest(): any {

        //HTTP-Request um Video zu stoppen
        this.http.get("http://192.168.0.150/proxy/stop_video.php").subscribe();
    }

    //Anfrage an Proxy schicken, damit der Pi heruntergefahren wird
    sendShutdownRequest(): any {

        //HTTP-Request um Pi herunterzufahren
        this.http.get("http://192.168.0.150/proxy/shutdown_pi.php").subscribe();
    }

    //Videoliste aus Webseite und auf Server vergleichen
    sendCheckVideolistReqeuist(video_string): any {

        //HTTP-Reqeust fuer Vergleich der Videolisten
        this.http.post("http://192.168.0.150/proxy/check_videolist.php", JSON.stringify({ video_string: video_string })).subscribe();
    }
}