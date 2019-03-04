import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playlistSearch'
})
export class PlaylistSearchPipe implements PipeTransform {

  //Suchstring wird uebergeben
  transform(item: string, searchString: string): any {

    //Wenn Suchfeld leer ist, Treffer nicht ausblenden anzeigen
    if (!searchString) {
      return false;
    }

    //Filtersuchbegriff ausgewaehlt
    else {

      //durchsuchten String und Suchstring als lowercase: "Bobo Drache" -> "bobo drache"
      let haystackLower = item.toLowerCase();
      let searchStringLower = searchString.toLowerCase();

      //Suchstring in einzelne Terme aufteilen: "bobo drache" -> ["bobo", "drache"]
      let searchStringArray = searchStringLower.split(" ");

      //davon ausgehen, dass Suche gefunden wird
      let containsSubstrings = true;

      //Alle Terme des Suchstrings pruefen, ob sie im durchsuchten String enthalten sind
      for (let searchStringValue of searchStringArray) {

        //Nur nicht-leere Terme ansehen
        if (searchStringValue.trim() != "") {

          //wenn Term nicht in Suchstring enthalten ist
          if (haystackLower.indexOf(searchStringValue) === -1) {

            //dieses Item fuer Anzeige ignorieren und keine weiteren Terme mehr pruefen
            containsSubstrings = false;
            break;
          }
        }
      }

      //Ergebnis zurueckliefern, ob Item ausgeblendet werden soll
      return !containsSubstrings;
    }
  }
}