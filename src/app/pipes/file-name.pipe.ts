import { Pipe, PipeTransform } from '@angular/core';
import * as path from 'path';

@Pipe({
  name: 'fileName'
})
export class FileNamePipe implements PipeTransform {

  //String formattieren
  transform(value: string, args?: any): any {

    //Datei kommt als kompletter Pfad: nur Dateiname ausgeben
    let fileName = path.basename(value);

    //Zahlen filtern
    fileName = fileName.replace(/\d+( -|-|_)*\.*\d*/g, '');

    //Datei-Endung mp3 entfernen
    fileName = fileName.replace(/.mp3/i, '');

    //gefilterten Namen zurueckliefern
    return fileName.trim();
  }
}