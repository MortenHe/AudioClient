import { Pipe, PipeTransform } from '@angular/core';
import { Video } from '../config/main';

@Pipe({
  name: 'modeFilter'
})

//nach einem Modus im Video-Objekt filtern
export class ModeFilterPipe implements PipeTransform {

  //Modus Filter fuer Videoliste
  transform(items: Video[], mode: string): any {

    //Wenn alle Videos angezeigt werden sollen
    if (mode === "all") {

      //Alle Items zurueckgeben
      return items;
    }

    //es ist auf einen gewissen Modus (z.B. Conni) eingeschraenkt
    else {

      //Nur die Elemente eines gewissen Modus zurueckgeben
      return items.filter(item =>
        item.mode === mode
      );
    }
  }
}