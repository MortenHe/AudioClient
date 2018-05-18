import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileName'
})
export class FileNamePipe implements PipeTransform {

  //String formattieren
  transform(value: string, args?: any): any {

    //Datei kommt als kompletter Pfad: nur Dateiname ausgeben
    let fileName = value.split(/[\\/]/).pop();

    //Datei-Endung mp3, mp4 entfernen
    fileName = fileName.replace(/.mp3/i, '');
    fileName = fileName.replace(/.mp4/i, '');

    //Zahlen filtern
    fileName = fileName.replace(/\d+( -|-|_)*\.*\d*/g, '');

    //gefilterten Namen zurueckliefern
    return fileName.trim();
  }
}