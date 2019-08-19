import { Pipe, PipeTransform } from '@angular/core';
import * as path from 'path';

@Pipe({
  name: 'fileName'
})
export class FileNamePipe implements PipeTransform {

  //String formattieren
  transform(songName: string): any {

    let fileName = path.basename(songName, '.mp3');
    return fileName.replace(/(^\d+ - |.+ - .+ - | \(.*\))/, '');
  }
}