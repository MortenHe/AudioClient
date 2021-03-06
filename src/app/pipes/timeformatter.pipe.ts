import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeformatter'
})

//Zeit-String formattieren
export class TimeformatterPipe implements PipeTransform {

  transform(length_string: string, args?: any): any {

    //Wenn kein Wert gesetzt -> leeren String liefern
    if (!length_string) {
      return "";
    }

    //Wenn keine Stunde und keine 10-er Minute
    if (length_string.startsWith("00:0")) {
      return length_string.substring(4);
    }

    //Wenn keine Stunde
    else if (length_string.startsWith("00:")) {
      return length_string.substring(3);
    }

    //wenn keine 10er Stunde
    else if (length_string.startsWith("0")) {
      return length_string.substring(1);
    }

    //keine Bedingung erfuellt, Original-String zurueckgeben
    else {
      return length_string;
    }
  }
}