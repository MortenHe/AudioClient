import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PROXY_URL } from '../config/main-config';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class VideoService {

    //URL wo die Proxyskripte liegen aus config laden
    proxyUrl = PROXY_URL;

    //Komplette Videoliste wird nur 1 Mal geholt
    videoListFull;

    //Videomodus als BS, das abboniert werden kann
    videoModeBS = new BehaviorSubject("kinder");

    //Liste der Videos dieses Videomodus als BS, das abboniert werden kann
    videoListSub = new BehaviorSubject([]);

    //Liste der Mode Filter dieses Video-Modus als Subject, das abboniert werden kann
    modeFilterListSub = new Subject();

    //Service injekten
    constructor(private http: Http) { }

    //Videoliste laden
    loadFullVideolist() {

        //Videoliste holen per HTTP-Request
        this.http.get(this.proxyUrl + "get_videolist.php").map(response => response.json()).subscribe(videolist => {

            //Videoliste speichern
            this.videoListFull = videolist;

            //Wenn sich Videomodus aendert
            this.videoModeBS.subscribe(videoMode => {

                //Videoliste des aktuellen Videomodus setzen
                this.videoListSub.next(this.videoListFull[videoMode].videos);

                //Filter-Modus-Liste des aktuellen Videomodus setzen
                this.modeFilterListSub.next(this.videoListFull[videoMode].filter);
            });
        });
    }

    //Videomodus liefern
    getVideoMode() {
        return this.videoModeBS;
    }

    //Videomodus setzen
    setVideoMode(mode) {
        this.videoModeBS.next(mode);
    }

    //Videoliste liefern
    getVideolist() {
        return this.videoListSub;
    }

    //Liste der Filter-Optionen liefern
    getModeFilterList() {
        return this.modeFilterListSub;
    }

    //Anfrage an Proxy schicken, damit dieser ein Video / Liste von Videos startet
    sendVideoPlayRequest(videoList) {

        //Dateiname(n) und Modus mitschicken bei HTTP-Request
        //TODO Videomode
        this.http.post(this.proxyUrl + "start_playlist.php", JSON.stringify({ video_mode: "kinder", video_list: videoList })).subscribe();
    }

    //Anfrage an Proxy schicken, damit dieser das Videoplayback stoppt
    sendVideoStopRequest(): any {
        this.http.get(this.proxyUrl + "stop_video.php").subscribe();
    }

    //Anfrage an Proxy schicken, damit der Pi heruntergefahren wird
    sendShutdownRequest(): any {
        this.http.get(this.proxyUrl + "shutdown_pi.php").subscribe();
    }

    //Videoliste aus Webseite und auf Server vergleichen und Ergebnis zurueckliefern
    sendCheckVideolistRequest(): Observable<any> {
        return this.http.get(this.proxyUrl + "check_videolist.php").map(response => response.json() as any);
    }

    //Anfrage an Proxy schicken, damit diese z.B: das Video pausiert oder 30 sek nach rechts sprint
    sendVideoControlRequest(command): any {
        this.http.get(this.proxyUrl + "video_control.php?command=" + command).subscribe();
    }
}