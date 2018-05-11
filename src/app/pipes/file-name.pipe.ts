import { Pipe, PipeTransform } from '@angular/core';
import * as path from 'path';

@Pipe({
  name: 'fileName'
})
export class FileNamePipe implements PipeTransform {

  //String formattieren
  transform(value: string, args?: any): any {

    //Datei kommt als kompletter Pfad: nur Dateiname ausgeben: ^\d+ - um 01 - zu filtern
    return path.basename(value);
  }
}