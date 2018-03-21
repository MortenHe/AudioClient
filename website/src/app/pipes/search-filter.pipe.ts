import { Pipe, PipeTransform } from '@angular/core';
import { Video } from '../config/main';

@Pipe({
  name: 'searchFilter'
})

//Videoliste anhand eines Suchstrings filtern
export class SearchFilterPipe implements PipeTransform {

  //Suchstring wird uebergeben
  transform(items: Video[], search_string: string): any {

    //Wenn Suchfeld leer ist
    if (!search_string) {

      //alle Treffer anzeigen
      return items;
    }

    //Filtersuchbegriff ausgewaehlt
    else {

      //Items filtern
      return items.filter(item => {

        //Titel und Suchstring als lowercase: "Bobo Drache" -> "bobo drache"
        let title = item.name.toLowerCase();
        let search_string_lower = search_string.toLowerCase();

        //Suchstring in einzelne Terme aufteilen: "bobo drache" -> ["bobo", "drache"]
        let search_string_array = search_string_lower.split(" ");

        //davon ausgehen, dass Suche gefunden wird
        let contains_substrings = true;

        //Alle Terme des Suchstrings pruefen, ob sie im Titel enthalten sind
        for (let search_string_value of search_string_array) {

          //Nur nicht-leere Terme ansehen
          if (search_string_value.trim() != "") {

            //wenn Term nicht in Titel enthalten ist
            if (title.indexOf(search_string_value) === -1) {

              //diesen Titel fuer Anzeige ignorieren und keine weiteren Terme mehr pruefen
              contains_substrings = false;
              break;
            }
          }
        }

        //Ergebnis zurueckliefern, ob Titel angezeigt werden soll
        return contains_substrings;
      });
    }
  }
}