import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ResultfilterService } from '../../services/resultfilter.service';
import { BackendService } from '../../services/backend.service';
import * as path from 'path';

@Component({
  selector: 'app-mix',
  templateUrl: './mix.component.html',
  styleUrls: ['./mix.component.scss']
})
export class MixComponent implements OnInit {

  //Suchfeld
  searchField = new FormControl("");

  //Suchwert
  searchTerm = "";

  //Liste der auswaehlbaren Dateien
  searchFiles = [];

  //Liste der Dateien im Mix-Ordner
  mixFiles = [];

  //Wo liegen die Mixfiles?
  mixDir = "/media/usb_audio/audio/kindermusik/misc/mix";

  //Liste der Aktionen, die auf dem Server durchgefuehrt werden (move, delete)
  actionList = [];

  constructor(private bs: BackendService, private fs: ResultfilterService) { }

  ngOnInit() {

    //Liste der auswaehlbaren Files abbonieren
    this.bs.getSearchFiles().subscribe(searchFiles => {
      this.searchFiles = searchFiles;
    });

    //Liste der Mixfiles abbonieren
    this.bs.getMixFiles().subscribe(mixFiles => {
      this.mixFiles = mixFiles;
    });

    //Bei Aenderung des Suchfeldes den Suchterm in Filterservice eintragen
    this.searchField.valueChanges.subscribe(searchTerm => {
      this.fs.setMixSearchTerm(searchTerm);
    });

    //Wenn sich Term von extern aendert -> Wert merken und Suchfeld setzen
    this.fs.getMixSearchTerm().subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      this.searchField.setValue(searchTerm, { emitEvent: false });
    });
  }

  //Neue Datei zu Liste fuer Mix-Ordner hinzufuegen
  addItem(item) {
    this.mixFiles.unshift({
      "type": "new",
      "path": item.path
    });
  }

  //Titel aus Liste fuer Mix-Ordner entfernen
  removeItem(index, item) {

    //Aus Liste entfernen
    this.mixFiles.splice(index, 1);

    //Wenn es ein Titel aus dem Mix-Ordner ist, diesen zur Loeschung vormerken
    if (item.type === "old") {
      this.actionList.push({
        "type": "remove",
        "path": item.path
      });
    }
  }

  //Aenderungen an Mix-Ordner an Server melden
  saveChanges() {
    this.mixFiles.forEach((value, index) => {

      //Zwischen alten Dateien (bereits im Mix-Ordner) und neuen Dateien (noch nicht im Mix-Ordner) unterscheiden
      switch (value.type) {

        //Alte Datei im Mix-Ordner umbenennen
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

        //Neue Datei in den Mix-Ordner kopieren
        case "new":

          //Dateiname: MH - At Ease.mp3
          const origFileName = path.basename(value.path);

          //Neuer Dateiname mit Praefix anhand der Position in der Liste: 03 + " - " +  MH - At Ease.mp3 =>  03 - MH - At Ease.mp3
          const prefixedFileName = (index + 1).toString().padStart(2, '0') + " - " + origFileName;

          //Kopieren in den Mix-Ordner vormerken
          this.actionList.push({
            "type": "copy",
            "from": value.path,
            "to": this.mixDir + "/" + prefixedFileName
          });
          break;
      }
    });

    //Liste der Aktionen fuer Mix-Ordner an Server schicken
    if (this.actionList.length) {
      this.bs.sendMessage({
        type: "update-mix-folder",
        value: this.actionList
      });

      //Liste der Aktionen wieder leeren
      this.actionList = [];
    }
  }
}