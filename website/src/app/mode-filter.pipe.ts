import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modeFilter'
})

export class ModeFilterPipe implements PipeTransform {

  //Modus Filter fuer Videoliste
  transform(items: any, mode: any): any {

    //Wenn alle Videos angezeigt werden sollen
    if (mode === "*") {

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