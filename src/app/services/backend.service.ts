import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ResultfilterService } from './resultfilter.service';
import { ModeFilterPipe } from '../pipes/mode-filter.pipe';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { Subject } from 'rxjs';
import { Observer } from 'rxjs';

@Injectable()
export class BackendService {

    //URL fuer Server (um App zu aktivieren)
    serverUrl: string;

    //URL fuer WebSocketServer
    wssUrl: string;

    //WebSocket
    socket: Subject<any>;

    //Komplette Itemliste wird nur 1 Mal geholt
    itemListFull;

    //Mode-Filter (conni, heidi)
    modeFilter;

    //Suchefeld-Filter
    searchTerm;

    //Sortierfeld
    orderField;

    //umgekehrte Reihenfolge
    reverseOrder;

    //Modus als BS, das abboniert werden kann
    modeBS = new BehaviorSubject("hsp");

    //gefilterte und sortierte Itemliste als BS, das abboniert werden kann
    itemListFilteredBS = new BehaviorSubject([]);

    //Liste der Mode Filter dieses Modus als BS, das abboniert werden kann
    modeFilterListBS = new BehaviorSubject(null);

    //Lautstaerke
    volume$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    //Zeit innerhalb items
    time$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    //Countdownzeit
    countdownTime$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    //Die Dateien, die gerade abgespielt werden
    files$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    //Die Dateien, die fuer den Herz-Mix-Ordner ausgewaehlt werden koennen
    searchFiles$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    //Herz-Mix-Files-Ordner
    mixDir$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    //Die Dateien, die gerade im Herz-Mix-Ordner liegen
    mixFiles$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    //Aktueller Index in Titelliste
    position$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    //aktueller Pause-Zustand
    paused$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    //aktives Item
    activeItem$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    //Name der aktiven Playlist: Rolf Zuckowski - Starke Kinder
    activeItemName$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    //Usermode (um Herz-Mix-Ordner ueber Oberflaeche aendern zu koennen), Bsp. PW-Player laueft und man kann dort Luis AudioMix anpassen
    userMode$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    //HTML-Page Title
    pageTitle$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    //wurde Server heruntergefahren?
    shutdown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    //Ist die App gerade mit dem WSS verbunden?
    connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    //Websocket erstellen, von dort erhaelt man die JSON-Infos ueber verfuegbare Playlists
    constructor(private http: HttpClient, private fs: ResultfilterService, private modeFilterPipe: ModeFilterPipe, private searchFilterPipe: SearchFilterPipe, private orderByPipe: OrderByPipe) {

        //IP-Adresse des Servers ermittln und daraus Links zu WSS und PHP-Skript erstellen
        const host = window.location.hostname;
        this.serverUrl = 'http://' + host + '/php';
        this.wssUrl = 'ws://' + host + ':8080';

        //WebSocket-Verbindung aufbauen
        this.createWebsocket();
    }

    //Subscriptions erstellen, die die komplette JSON-Liste filtern
    finishInit() {

        //Wenn sich der Modus aendert
        this.modeBS.subscribe(mode => {

            //Filter-Modus-Liste des aktuellen Modus setzen
            this.modeFilterListBS.next(this.itemListFull[this.modeBS.getValue()].filter);

            //Filterte Liste erstellen
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
    }

    //Wenn Modus / Filter / Sortierung angepasst wurde, muss Itemliste neu erstellt / gefiltert / sortiert werden
    filterItemList() {

        //Mode-Filter auf Items dieses Modus anwenden
        let filteredItemList = this.modeFilterPipe.transform(this.itemListFull[this.modeBS.getValue()].items, this.modeFilter);

        //Suchfeld-Filter anwenden
        filteredItemList = this.searchFilterPipe.transform(filteredItemList, this.searchTerm);

        //Sortierung anwenden
        filteredItemList = this.orderByPipe.transform(filteredItemList, this.orderField, this.reverseOrder);

        //neue Itemliste in BS schieben
        this.itemListFilteredBS.next(filteredItemList);
    }

    getMode() {
        return this.modeBS;
    }

    setMode(mode) {
        this.modeBS.next(mode);
    }

    getFilteredItemlist() {
        return this.itemListFilteredBS;
    }

    getModeFilterList() {
        return this.modeFilterListBS;
    }

    //Verbindung zu WSS herstellen
    public createWebsocket() {

        //Socket-Verbindung mit URL aus Config anlegen
        let socket = new WebSocket(this.wssUrl);
        let observable = Observable.create(
            (observer: Observer<MessageEvent>) => {
                socket.onmessage = observer.next.bind(observer);
                socket.onerror = observer.error.bind(observer);
                socket.onclose = observer.complete.bind(observer);
                return socket.close.bind(socket);
            }
        );
        let observer = {
            next: (data: Object) => {
                //console.log(data);

                //Wenn Verbindung zu WSS existiert
                if (socket.readyState === WebSocket.OPEN) {

                    //App ist mit WSS verbunden
                    this.connected$.next(true);

                    //Wenn es nicht nur ein Ping Message ist (die ggf. Verbindung wieder herstellt)
                    if (data["type"] !== "ping") {

                        //Nachricht an WSS schicken
                        socket.send(JSON.stringify(data));
                    }
                }

                //keine Verbindung zu WSS
                else {
                    //App ist nicht mit WSS verbunden
                    this.connected$.next(false);
                    //console.log("ready state ist " + socket.readyState);

                    //Verbindung zu WSS wieder herstellen                    
                    this.createWebsocket();
                }
            }
        };

        //WebSocket anlegen
        this.socket = Subject.create(observer, observable);

        //auf Nachrichten vom Server reagieren
        this.socket.subscribe(message => {
            let obj = JSON.parse(message.data);
            //console.log(obj);
            let value = obj.value;

            //Switch anhand Message-Types
            switch (obj.type) {
                case "volume":
                    this.volume$.next(value);
                    break;

                case "time":
                    this.time$.next(value);
                    break;

                case "countdownTime":
                    this.countdownTime$.next(value);
                    break;

                case "position":
                    this.position$.next(value);
                    break;

                case "paused":
                    this.paused$.next(value);
                    break;

                case "files":
                    this.files$.next(value);
                    break;

                case "searchFiles":
                    this.searchFiles$.next(value);
                    break;

                case "mixDir":
                    this.mixDir$.next(value);
                    break;

                case "mixFiles":
                    this.mixFiles$.next(value);
                    break;

                case "mainJSON":
                    this.itemListFull = value;

                    //Subscriptions anlegen, damit Aenderungen an Mode, etc. auf itemList angewendet werden
                    this.finishInit();
                    break;

                case "activeItem":
                    this.activeItem$.next(value);
                    break;

                case "activeItemName":
                    this.activeItemName$.next(value);
                    break;

                case "userMode":
                    this.userMode$.next(value);
                    break;

                case "pageTitle":
                    this.pageTitle$.next(value);
                    break;

                case "shutdown":
                    this.shutdown$.next(true);
                    break;
            }
        });
    }

    //Nachricht an WSS schicken
    sendMessage(messageObj) {
        //console.log(messageObj);
        this.socket.next(messageObj);
    }

    getVolume() {
        return this.volume$;
    }

    getTime() {
        return this.time$;
    }

    getCountdownTime() {
        return this.countdownTime$;
    }

    getFiles() {
        return this.files$;
    }

    getSearchFiles() {
        return this.searchFiles$;
    }

    getMixDir() {
        return this.mixDir$;
    }

    getMixFiles() {
        return this.mixFiles$;
    }

    getPosition() {
        return this.position$;
    }

    setPosition(position) {
        this.position$.next(position);
    }

    getPaused() {
        return this.paused$;
    }

    getActiveItem() {
        return this.activeItem$;
    }

    getActiveItemName() {
        return this.activeItemName$;
    }

    getUserMode() {
        return this.userMode$;
    }

    getPageTitle() {
        return this.pageTitle$;
    }

    getShutdown() {
        return this.shutdown$;
    }

    getConnected() {
        return this.connected$;
    }

    //App aktivieren = WSS starten
    activateApp() {
        return this.http.get(this.serverUrl + "/activateAudioApp.php?mode=audio");
    }
}