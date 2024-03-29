import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../config/main-config';

@Pipe({
  name: 'orderBy'
})

//Pipe zur Sortierung der Items
export class OrderByPipe implements PipeTransform {

  //Soriterung nach Name oder nach Zeit und Name als 2. Sortierkriterium
  transform(items: Item[], orderField: string, reverseOrder: boolean): any {

    //Items soriteren, dazu immer 2 Elemente vergleichen
    items.sort((a: Item, b: Item) => {

      //Wenn nach Hinzufuege-Datum sortiert wird
      if (orderField === 'added') {

        //Wenn beide Items kein "added"-Merkmal haben -> nach Name sortieren
        if (a.added === undefined && b.added === undefined) {
          return a.name.localeCompare(b.name);
        }

        //Wenn 1. Item kein "added-Merkmal hat" => 2. Feld
        if (a.added === undefined) {
          return 1;
        }

        //Wenn 2. Item kein "added-Merkmal hat" => 1. Feld
        if (b.added === undefined) {
          return -1;
        }

        //Wenn sich "added"-Werte untescheiden -> nach added sortieren (absteigend)
        if (a.added !== b.added) {
          return b.added.localeCompare(a.added);
        }

        //bei gleichen "added"-Werten nach Name sortieren
        else {
          return a.name.localeCompare(b.name);
        }
      }

      //Wenn nach Name sortiert wird
      if (orderField === 'name') {

        //normale Sortierung nach Namensfeld (nur aufsteigend moeglich), numeric/base damit 109 hinten 2-stelligen Ziffern kommt
        return a.name.localeCompare(b.name, 'de',
          {
            numeric: true,
            sensitivity: 'base'
          });
      }

      //Sortierung nach Laenge
      else if (orderField === 'length') {

        //Wenn ein Eintrag die Laenge null hat, diesen vorne hinsortieren
        if (a.length === null && b.length !== null) {
          return -1;
        }

        //Wenn ein Eintrag die Laenge null hat, diesen vorne hinsortieren
        if (a.length !== null && b.length === null) {
          return 1;
        }

        //Wenn die Laenge unterschiedlich ist und die Eintraege nicht null sind
        if (a.length !== b.length && (a.length !== null && b.length !== null)) {

          //Aufsteigende Sortierung
          if (!reverseOrder) {

            //normale Sortierung nach Laengenfeld
            return a.length > b.length ? 1 : -1;
          }

          //absteigende Sortierung
          else {

            //absteigende Sortierung nach Laengenfeld
            return a.length < b.length ? 1 : -1;
          }
        }

        //beide Items haben die gleichen Laenge oder beide sind null
        else {

          //dann Namensfeld als 2. Sortierkritierum verwenden (aufsteigend)
          return a.name.localeCompare(b.name, 'de',
            {
              numeric: true,
              sensitivity: 'base'
            });
        }
      }
    });

    //sortiertes Array zurueckgeben
    return items;
  }
}