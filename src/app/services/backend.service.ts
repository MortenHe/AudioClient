import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ResultfilterService } from './resultfilter.service';
import { ModeFilterPipe } from '../pipes/mode-filter.pipe';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { environment } from '../../environments/environment';

@Injectable()
export class BackendService {

    //URL wo die Proxyskripte liegen aus config laden
    proxyUrl = environment.proxyUrl;

    //audio vs. video
    appMode = environment.appMode;

    //produktiv-System?
    production = environment.production;

    //Komplette Itemliste wird nur 1 Mal geholt
    itemListFull;

    //Mode als Variable
    mode;

    //Mode-Filter (conni, heidi)
    modeFilter;

    //Suchefeld-Filter
    searchTerm;

    //Sortierfeld
    orderField;

    //umgekehrte Reihenfolge
    reverseOrder;

    //Modus als BS, das abboniert werden kann
    modeBS = new BehaviorSubject("kinder");

    //gefilterte und sortierte Itemliste als BS, das abboniert werden kann
    itemListFilteredBS = new BehaviorSubject([]);

    //Liste der Mode Filter dieses Modus als BS, das abboniert werden kann
    modeFilterListSB = new BehaviorSubject([]);

    //Service injekten
    constructor(private http: Http, private fs: ResultfilterService, private modeFilterPipe: ModeFilterPipe, private searchFilterPipe: SearchFilterPipe, private orderByPipe: OrderByPipe) {
    }

    //Itemlist laden
    loadFullItemlist() {

        //Itemlist holen per HTTP-Request
        this.http.get(this.proxyUrl + "get_itemlist.php?app_mode=" + environment.appMode).map(response => response.json()).subscribe(itemlist => {

            //komplette Itemliste speichern
            this.itemListFull = itemlist;

            //Wenn sich der Modus aendert
            this.modeBS.subscribe(mode => {

                //Modus in Variable speichern (fuer Start Playlist Funktion)
                this.mode = mode;

                //Filter-Modus-Liste des aktuellen Modus setzen
                this.modeFilterListSB.next(this.itemListFull[mode].filter);

                //gefilterte Itemliste erstellen
                this.filterItemList();
            });

            //Aenderungen an ModeFilter abbonieren, speichern und Itemliste neu erstellen
            this.fs.getModeFilter().subscribe(modeFilter => {
                this.modeFilter = modeFilter;
                this.filterItemList();
            });

            //Aenderungen an Suchterm abbonieren, speichern und Itemliste neu erstellen
            this.fs.getSearchTerm().subscribe(searchTerm => {
                this.searchTerm = searchTerm;
                this.filterItemList();
            });

            //Aenderungen an Sortierfeld abbonieren, speichern und Itemliste neu erstellen
            this.fs.getOrderField().subscribe(orderField => {
                this.orderField = orderField;
                this.filterItemList();
            });

            //Aenderungen an umgekehrter Sortierung abbonieren, speichern und Itemliste neu erstellen
            this.fs.getReverseOrder().subscribe(reverseOrder => {
                this.reverseOrder = reverseOrder;
                this.filterItemList();
            });
        });
    }

    //Wenn Modus / Filter / Sortierung angepasst wurde, muss Itemliste neu erstellt / gefiltert / sortiert werden
    filterItemList() {

        //Mode-Filter auf Items dieses Modus anwenden
        let filteredItemList = this.modeFilterPipe.transform(this.itemListFull[this.mode].items, this.modeFilter);

        //Suchfeld-Filter anwenden
        filteredItemList = this.searchFilterPipe.transform(filteredItemList, this.searchTerm);

        //Sortierung anwenden
        filteredItemList = this.orderByPipe.transform(filteredItemList, this.orderField, this.reverseOrder);

        //neue Itemliste in BS schieben
        this.itemListFilteredBS.next(filteredItemList);
    }

    //Modus liefern
    getMode() {
        return this.modeBS;
    }

    //Modus setzen
    setMode(mode) {
        this.modeBS.next(mode);
    }

    //gefilterte und sortierte Itemliste liefern
    getFilteredItemlist() {
        return this.itemListFilteredBS;
    }

    //Liste der Filter-Optionen liefern
    getModeFilterList() {
        return this.modeFilterListSB;
    }

    //Anfrage an Proxy schicken, damit dieser Item(s) startet
    sendPlayRequest(itemList) {

        //Dateiname(n) und Modus mitschicken bei HTTP-Request
        this.http.post(this.proxyUrl + this.appMode + "_start_playback.php", JSON.stringify({ production: this.production, mode: this.mode, item_list: itemList })).subscribe();
    }

    //Anfrage an Proxy schicken, damit dieser das Playback stoppt
    sendPlaybackStopRequest(): any {

        //passenden Proxy fuer Video / Audio ansteuern
        this.http.get(this.proxyUrl + this.appMode + "_stop_playback.php").subscribe();
    }

    //Anfrage an Proxy schicken, damit diese z.B: das Video pausiert oder 30 sek nach rechts sprint oder zum naechsten Audio-Titel wechselt
    sendPlaybackControlRequest(command): any {
        this.http.get(this.proxyUrl + this.appMode + "_control_playback.php?command=" + command).subscribe();
    }

    //Itemlists aus Webseite und auf Server vergleichen und Ergebnis zurueckliefern
    sendCompareItemlistsRequest(): Observable<any> {
        return this.http.get(this.proxyUrl + "compare_itemlists.php?app_mode=" + this.appMode + "&production=" + this.production).map(response => response.json() as any);
    }
}