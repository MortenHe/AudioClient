import { Pipe, PipeTransform } from '@angular/core';
import * as path from 'path';

@Pipe({
  name: 'fileName'
})
export class FileNamePipe implements PipeTransform {

  transform(filePath: string, prefixFilter?: string): any {

    //Dateiname aus Pfad extrahieren: /home/pi/.../01 - Ansage.mp3 -> 01 - Ansage
    let fileName = path.basename(filePath, '.mp3');

    //Wenn in der Playlist die fuerhenden Zahlen entfernt werden sollen (01 - Ansage -> Ansage)
    //oder ein anderer Modefilter als Alle oder Sonstige ausgewaehlt ist, den Namen der Serie (Bibi und Tina - ) vorne wegkuerzen fuer mehr Platz
    if (prefixFilter === "digit" || (prefixFilter && ((prefixFilter !== "all" && prefixFilter !== "misc")))) {
      fileName = fileName.replace(/^[A-Za-z0-9_äÄöÖüÜß ]* - /, '');
    }
    return fileName;
  }
}