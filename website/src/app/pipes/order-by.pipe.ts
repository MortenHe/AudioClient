import { Pipe, PipeTransform } from '@angular/core';
import { Video } from '../config/main';

@Pipe({
  name: 'orderBy'
})

//Pipe zur Sortierung der Videos
export class OrderByPipe implements PipeTransform {

  //SOrtierung nach Name oder nach Zeit und Name als 2. Sortierkriterium
  transform(items: Video[], orderField: string, reverseOrder: boolean): any {

    //Items soriteren, dazu immer 2 Elemente vergleichen
    items.sort((a: Video, b: Video) => {

      //Wenn nach Name sortiert wird
      if (orderField === 'name') {

        //normale Sortierung nach Namensfeld (nur aufsteigend moeglich)
        return a.name > b.name ? 1 : -1;
      }

      //Sortierung nach Laenge
      else if (orderField === 'length') {

        //Wenn die Laenge unterschiedlich ist
        if (a.length !== b.length) {

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

        //beide Videos haben die gleichen Laenge
        else {

          //dann Namensfeld als 2. Sortierkritierum verwenden (aufsteigend)
          return a.name > b.name ? 1 : -1;
        }
      }
    });

    //sortiertes Array zurueckgeben
    return items;
  }
}