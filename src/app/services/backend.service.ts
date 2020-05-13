import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ResultfilterService } from './resultfilter.service';
import { ModeFilterPipe } from '../pipes/mode-filter.pipe';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class BackendService {

    //URL fuer Server (um App zu aktivieren)
    serverUrl = environment.serverUrl;

    //URL fuer WebSocketServer
    wssUrl = environment.wssUrl;

    //WebSocket
    socket: Subject<any>;

    //produktiv-System?
    production = environment.production;

    //Komplette Itemliste wird nur 1 Mal geholt
    itemListFull;

    //Mode-Filter (conni, heidi)
    modeFilter;

    //Suchefeld-Filter
    searchTerm;

    //sollen auch Tracks durchsucht werden
    searchIncludeTracks;

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

    //Random Playback erlaubt als BS, das abboniert werden kann
    allowRandomBS = new BehaviorSubject(false);

    //Lautstaerke
    volume$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    //Zeit innerhalb items
    time$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    //Countdownzeit
    countdownTime$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    //Die Dateien, die gerade abgespielt werden
    files$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    //Die Dateien, die fuer den mixFileOrdner ausgewaehlt werden koennen
    searchFiles$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    //Mix-Files-Ordner
    mixDir$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    //Die Dateien, die gerade im mixFileOrdner liegen
    mixFiles$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    //Aktueller Index in Titelliste
    position$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    //aktueller Pause-Zustand
    paused$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    //aktueller Random-Zustand
    random$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    //aktueller JokerLock-Zustand (wird gerade Joker-Playlist kopiert?)
    jokerLock$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    //aktives Item
    activeItem$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    //Name der aktiven Playlist: Rolf Zuckowski - Starke Kinder
    activeItemName$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    //wurde Server heruntergefahren?
    shutdown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    //ist Random bei der aktuell laufenden Playlist erlaubt?
    allowRandomRunning$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    //Ist die App gerade mit dem WSS verbunden?
    connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    //Websocket erstellen, von dort erhaelt man die JSON-Infos ueber verfuegbare Playlists
    constructor(private http: HttpClient, private fs: ResultfilterService, private modeFilterPipe: ModeFilterPipe, private searchFilterPipe: SearchFilterPipe, private orderByPipe: OrderByPipe) {
        this.createWebsocket();
    }

    //Subscriptions erstellen, die die komplette JSON-Liste filtern
    finishInit() {

        //Wenn sich der Modus aendert
        this.modeBS.subscribe(mode => {

            //Wert in BS setzen, ob Random in diesem Modus erlaubt ist
            this.allowRandomBS.next(this.itemListFull[this.modeBS.getValue()].allowRandom);

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

        //Aenderungen an Track-Sichtbarkeit abbonieren, speichern und Itemliste neu erstellen
        this.fs.getShowTracks().subscribe(showTracks => {
            this.searchIncludeTracks = showTracks;
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
        filteredItemList = this.searchFilterPipe.transform(filteredItemList, this.searchTerm, this.searchIncludeTracks);

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

    getAllowRandom() {
        return this.allowRandomBS;
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

                case "random":
                    this.random$.next(value);
                    break;

                case "jokerLock":
                    this.jokerLock$.next(value);
                    break;

                case "activeItem":
                    this.activeItem$.next(value);
                    break;

                case "activeItemName":
                    this.activeItemName$.next(value);
                    break;

                case "allowRandom":
                    this.allowRandomRunning$.next(value);
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

    getRandom() {
        return this.random$;
    }

    getJokerLock() {
        return this.jokerLock$;
    }

    getActiveItem() {
        return this.activeItem$;
    }

    getActiveItemName() {
        return this.activeItemName$;
    }

    getShutdown() {
        return this.shutdown$;
    }

    getAllowRandomRunning() {
        return this.allowRandomRunning$;
    }

    getConnected() {
        return this.connected$;
    }

    //App aktivieren = WSS starten
    activateApp() {
        return this.http.get(this.serverUrl + "/activateAudioApp.php?mode=audio");
    }
}