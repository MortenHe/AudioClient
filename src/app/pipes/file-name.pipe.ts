import { Pipe, PipeTransform } from '@angular/core';
import * as path from 'path';

@Pipe({
  name: 'fileName'
})
export class FileNamePipe implements PipeTransform {

  transform(filePath: string, prefixFilter?: string): any {
    let fileName = filePath;

    //Bei Mixfiles und aktueller Playlist den Dateinamen aus Pfad extrahieren: /home/pi /.../01 - Ansage.mp3 -> 01 - Ansage
    if (prefixFilter === "digitOnly" || prefixFilter === "digit") {
      fileName = path.basename(filePath, path.extname(filePath), '.mp3');
    }

    //Nur Zahlen wegstreichen: 03 - Here We Go -> Here We Go
    if (prefixFilter === "digitOnly") {
      fileName = fileName.replace(/^[0-9]* - /, '');
    }

    //Wenn in der Playlist die fuerhenden Zeichen entfernt werden sollen (Ed Sheeran - Sing -> Sing)
    //oder ein anderer Modefilter als Alle oder Sonstige ausgewaehlt ist, den Namen der Serie (Bibi und Tina - ) vorne wegkuerzen fuer mehr Platz
    else if (prefixFilter === "digit" || (prefixFilter && ((prefixFilter !== "all" && prefixFilter !== "misc")))) {
      fileName = fileName.replace(/^[A-Za-z0-9_äÄöÖüÜß ]* - /, '');
    }

    return fileName;
  }
}