import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PROXY_URL } from '../config/main-config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ResultfilterService } from './resultfilter.service';
import { ModeFilterPipe } from '../pipes/mode-filter.pipe';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';

@Injectable()

export class VideoService {

    //URL wo die Proxyskripte liegen aus config laden
    proxyUrl = PROXY_URL;

    //Komplette Videoliste wird nur 1 Mal geholt
    videoListFull;

    //Videomode als Variable
    videoMode;

    //Mode-Filter (conni, heidi)
    modeFilter;

    //Suchefeld-Filter
    searchTerm;

    //Sortierfeld
    orderField;

    //umgekehrte Reihenfolge
    reverseOrder;

    //Videomodus als BS, das abboniert werden kann
    videoModeBS = new BehaviorSubject("kinder");

    //gefilterte und sortierte Videolist als BS, das abboniert werden kann
    videoListFilteredBS = new BehaviorSubject([]);

    //Liste der Mode Filter dieses Video-Modus als BS, das abboniert werden kann
    modeFilterListSB = new BehaviorSubject([]);

    //Service injekten
    constructor(private http: Http, private fs: ResultfilterService, private modeFilterPipe: ModeFilterPipe, private searchFilterPipe: SearchFilterPipe, private orderByPipe: OrderByPipe) {
    }


    //Videoliste laden
    loadFullVideolist() {

        //Videoliste holen per HTTP-Request
        this.http.get(this.proxyUrl + "get_videolist.php").map(response => response.json()).subscribe(videolist => {

            //Videoliste speichern
            this.videoListFull = videolist;

            //Wenn sich Videomodus aendert
            this.videoModeBS.subscribe(videoMode => {

                //Videomodus in Variable speichern (fuer Playlist start)
                this.videoMode = videoMode;

                //Filter-Modus-Liste des aktuellen Videomodus setzen
                this.modeFilterListSB.next(this.videoListFull[videoMode].filter);

                //gefilterte Videoliste erstellen
                this.filterVideoList();
            });

            //Aenderungen an ModeFilter abbonieren, speichern und Videoliste neu erstellen
            this.fs.getModeFilter().subscribe(modeFilter => {
                this.modeFilter = modeFilter;
                this.filterVideoList();
            });

            //Aenderungen an Suchterm abbonieren, speichern und Videoliste neu erstellen
            this.fs.getSearchTerm().subscribe(searchTerm => {
                this.searchTerm = searchTerm;
                this.filterVideoList();
            });

            //Aenderungen an Sortierfeld abbonieren, speichern und Videoliste neu erstellen
            this.fs.getOrderField().subscribe(orderField => {
                this.orderField = orderField;
                this.filterVideoList();
            });

            //Aenderungen an umgekehrter abbonieren, speichern und Videoliste neu erstellen
            this.fs.getReverseOrder().subscribe(reverseOrder => {
                this.reverseOrder = reverseOrder;
                this.filterVideoList();
            });
        });
    }

    //Wenn Videomodus / Filter / Sortierung angepasst wurde, muss Videoliste neu erstellt / gefiltert / sortiert werden
    filterVideoList() {

        //Mode-Filter auf Videos dieses Videomodus anwenden
        let filteredVideoList = this.modeFilterPipe.transform(this.videoListFull[this.videoMode].videos, this.modeFilter);
        
        //Suchfeld-Filter anwenden
        filteredVideoList = this.searchFilterPipe.transform(filteredVideoList, this.searchTerm);
        
        //Sortierung anwenden
        filteredVideoList = this.orderByPipe.transform(filteredVideoList, this.orderField, this.reverseOrder);

        //neue Videoliste in BS schieben
        this.videoListFilteredBS.next(filteredVideoList);
    }

    //Videomodus liefern
    getVideoMode() {
        return this.videoModeBS;
    }

    //Videomodus setzen
    setVideoMode(mode) {
        this.videoModeBS.next(mode);
    }

    //gefilterte und sortierte Videoliste liefern
    getFilteredVideolist() {
        return this.videoListFilteredBS;
    }

    //Liste der Filter-Optionen liefern
    getModeFilterList() {
        return this.modeFilterListSB;
    }

    //Anfrage an Proxy schicken, damit dieser ein Video / Liste von Videos startet
    sendVideoPlayRequest(videoList) {

        //Dateiname(n) und Modus mitschicken bei HTTP-Request
        this.http.post(this.proxyUrl + "start_playlist.php", JSON.stringify({ video_mode: this.videoMode, video_list: videoList })).subscribe();
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