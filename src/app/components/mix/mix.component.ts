import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ResultfilterService } from '../../services/resultfilter.service';
import { BackendService } from '../../services/backend.service';
import * as path from 'path';
import * as _ from 'lodash-es';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-mix',
    templateUrl: './mix.component.html',
    styleUrls: ['./mix.component.scss']
})
export class MixComponent implements OnInit {

    //Shutdown
    shutdown: boolean = false;

    //Name der aktuellen Playlist: Rolf Zuckowski - Starke Kinder
    activeItemName: string = "";

    //Suchfeld
    searchField = new FormControl("");

    //Suchwert
    searchTerm = "";

    //Liste der auswaehlbaren Dateien
    searchFiles = [];

    //Liste der Dateien im Herz-Mix-Ordner
    mixFiles = [];

    //Titel pro Seite in Herz-Mix-Files-Suche
    itemsPerPage: number = 10;

    //Wo soll Liste der durchsuchbaren Herz-Mix-Files anfangen
    pageStart: number = 0;

    //Originalliste der Dateien im Herz-Mix-Ordner
    mixFilesOrig = [];

    //Wo liegen die Herz-Mix-Dateien?
    mixDir: string = null;

    //Liste der Aktionen, die auf dem Server durchgefuehrt werden (move, delete)
    actionList = [];

    //Flag waehrend Titel gespeichert werden
    saving: boolean = false;

    //userMode fuer Name der Mix Playlist
    userMode: string;

    //Gibt es Aenderungen bei den Mixfolder Dateien
    hasUnsavedChanges = false;

    constructor(private bs: BackendService, private fs: ResultfilterService) { }

    ngOnInit() {

        //Shutdown Zustand abbonieren
        this.bs.getShutdown().subscribe(shutdown => {
            this.shutdown = shutdown;
        });

        //Name der aktuellen Playlist abbonieren
        this.bs.getActiveItemName().subscribe(activeItemName => {
            this.activeItemName = activeItemName
        });

        //Liste der auswaehlbaren Files abbonieren
        this.bs.getSearchFiles().subscribe(searchFiles => {
            this.searchFiles = searchFiles;
        });

        //Abo MixDir
        this.bs.getMixDir().subscribe(mixDir => {
            this.mixDir = mixDir;
        });

        //Liste der Mixfiles abbonieren
        this.bs.getMixFiles().subscribe(mixFiles => {

            //Liste der Herz-Mix-Files fuer Oberflaeche
            this.mixFiles = mixFiles;

            //Liste der Herz-Mix-Files nochmal zusaetzlich speichern, um vergleichen zu koennen ob sich Array geandert hat
            this.mixFilesOrig = mixFiles.slice();

            //Aenderungen-Flags zuruecksetzen
            this.hasUnsavedChanges = false;
            this.saving = false;
        });

        //Bei Aenderung des Suchfeldes den Suchterm in Filterservice eintragen
        this.searchField.valueChanges.subscribe(searchTerm => {
            this.fs.setMixSearchTerm(searchTerm);
        });

        //Wenn sich Term von extern aendert -> Wert merken und Suchfeld setzen und Paging auf 0 stellen
        this.fs.getMixSearchTerm().subscribe(searchTerm => {
            this.pageStart = 0;
            this.searchTerm = searchTerm;
            this.searchField.setValue(searchTerm, { emitEvent: false });
        });

        //Abo userMode
        this.bs.getUserMode().subscribe(userMode => {
            this.userMode = userMode;
        });
    }

    //Neue Datei zu Liste fuer Herz-Mix-Ordner hinzufuegen
    addItem(item) {

        //Auf jeden Fall Aenderung an Herz-Mix-Folder-Liste
        this.hasUnsavedChanges = true;

        //Datei bei Herz-Mix-Files oben einfuegen
        this.mixFiles.unshift({
            "type": "new",
            "path": item.path
        });
    }

    //Titel aus Liste fuer Herz-Mix-Ordner entfernen
    removeItem(index, item) {

        //Aus Liste entfernen
        this.mixFiles.splice(index, 1);

        //Pruefen, ob neue Liste wieder der urspruenglichen Liste entspricht (dann waeren keine Aenderungen zum Speichern da)
        this.checkIfMixFolderHasChanged();

        //Wenn es ein Titel aus dem Herz-Mix-Ordner ist, diesen zur Loeschung vormerken
        if (item.type === "old") {
            this.actionList.push({
                "type": "remove",
                "path": item.path
            });
        }
    }

    //Herz-Mix-Folder starten
    startMixFolder() {
        const playlistMode = path.basename(path.dirname(path.dirname(this.mixDir)));
        const playlistPath = path.basename(path.dirname(this.mixDir)) + "/" + path.basename(this.mixDir);

        //Namen fuer Playlist bauen, da diese hier ausnahmsweise von Client und nicht vom Server kommt: laila -> Herz-Mix Laila, luis -> Herz-Mix Luis
        const userModeClean = this.userMode.length > 2 ? this.userMode[0].toUpperCase() + this.userMode.substring(1) : this.userMode.toUpperCase();
        const playlistName = "Mix " + userModeClean;

        this.bs.sendMessage({
            type: "set-playlist",
            value: {
                name: playlistName,
                mode: playlistMode,
                path: playlistPath,
                allowRandom: true
            }
        });
    }

    //Wenn Umsortierung abgeschlossen ist -> Model anpassen und pruefen ob Herz-Mix-Liste Aenderungen hat
    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.mixFiles, event.previousIndex, event.currentIndex);
        this.checkIfMixFolderHasChanged();
    }

    //Pruefen ob geandertes Array (durch Umsortierung oder Loeschung) Aenderungen zum urspruenglichen Array hat
    checkIfMixFolderHasChanged() {
        this.hasUnsavedChanges = !(_.isEqual(this.mixFilesOrig, this.mixFiles));
    }

    //Aenderungen an Herz-Mix-Ordner an Server melden
    saveChanges() {
        this.saving = true;

        //Liste der Anederung erstellen und an Server schicken
        this.mixFiles.forEach((value, index) => {

            //Zwischen alten Dateien (bereits im Herz-Mix-Ordner) und neuen Dateien (noch nicht im Herz-Mix-Ordner) unterscheiden
            switch (value.type) {

                //Alte Datei im Herz-Mix-Ordner umbenennen
                case "old":

                    //Dateiname: 03 - MH - Show Me Heaven.mp3
                    const oldFileName = path.basename(value.path);

                    //Alten Praefix extrahieren: 03 - MH - Show Me Heaven.mp3 => 03
                    const oldPrefix = oldFileName.substr(0, 2);

                    //Neuen Praefix aus Position im Array ermitteln, dabei fuehrende Nullen auffuellen: 2 -> 02
                    const newPrefix = (index + 1).toString().padStart(2, '0');

                    //Wenn sich der Praefix geandert hat, der Datei den neuen Praefix geben fuer die korrekte Sortierung
                    if (oldPrefix !== newPrefix) {

                        //02 +  - MH - Show Me Heaven.mp3 => 02 - MH - Show Me Heaven.mp3
                        const newFileName = newPrefix + oldFileName.substr(2);

                        //Umbenennung Aktion vormerken
                        this.actionList.push({
                            "type": "move",
                            "from": this.mixDir + "/" + oldFileName,
                            "to": this.mixDir + "/" + newFileName
                        });
                    }
                    break;

                //Neue Datei in den Herz-Mix-Ordner kopieren
                case "new":

                    //Dateiname: 02 - MH - At Ease.mp3
                    const origFileName = path.basename(value.path);

                    //Zahlenpraefix kuerzen: 02 - MH - At Ease -> MH - At Ease.mp3
                    const shortFileName = origFileName.replace(/^\d{2} - /, '');

                    //Neuer Dateiname mit Praefix anhand der Position in der Liste: 03 + " - " +  MH - At Ease.mp3 =>  03 - MH - At Ease.mp3
                    const prefixedFileName = (index + 1).toString().padStart(2, '0') + " - " + shortFileName;

                    //Kopieren in den Herz-Mix-Ordner vormerken
                    this.actionList.push({
                        "type": "copy",
                        "from": value.path,
                        "to": this.mixDir + "/" + prefixedFileName
                    });
                    break;
            }
        });

        //Liste der Aktionen fuer Herz-Mix-Ordner an Server schicken
        if (this.actionList.length) {
            this.bs.sendMessage({
                type: "update-mix-folder",
                value: this.actionList
            });

            //Liste der Aktionen wieder leeren
            this.actionList = [];
        }
    }

    //aktuelle Seite fuer Paging Anzeige
    currentPage(itemCount: number) {
        return Math.min((this.pageStart / this.itemsPerPage) + 1, itemCount);
    }

    //Gesamtzahl der Pages fuer Anzeige
    totalPages(itemCount: number) {
        return Math.ceil(itemCount / this.itemsPerPage);
    }

    //Paging links / rechts
    changePage(direction: number) {
        this.pageStart = this.pageStart + (direction * this.itemsPerPage);
    }
}