import { Component, OnInit } from '@angular/core';
import { ResultfilterService } from '../../services/resultfilter.service';

@Component({
  selector: 'sortfilter',
  templateUrl: './sortfilter.component.html',
  styleUrls: ['./sortfilter.component.scss']
})

export class SortfilterComponent implements OnInit {

  //Sortierfeld
  orderField: string;

  //umgekehrte Sortierung
  reverseOrder: boolean;

  //Service injecten
  constructor(private fs: ResultfilterService) { }

  //beim Init
  ngOnInit() {

    //Sortierfeld per Service abbonieren
    this.fs.getOrderField().subscribe(orderField => this.orderField = orderField);

    //umgekehrte Sortierung per Service abbonieren
    this.fs.getReverseOrder().subscribe(reverseOrder => this.reverseOrder = reverseOrder);
  }

  //Sortierfeld setzen
  setOrder(field) {

    //Wenn nach Name sortiert wird
    if (field === "name") {

      //Immer aufsteigend sortieren (Wert in Service anpassen)
      this.fs.setReverseOrder(false);
    }

    //Wenn nach Laenge sortiert zum ersten Mal
    else if (field === "length" && this.orderField === "name") {

      //Nach Zeit absteigend sortieren (Wert in Service anpassen)
      this.fs.setReverseOrder(true);
    }

    //Wenn bereits nach Laenge sortiert wurde
    else {

      //Sortierreihenfolge toggeln (Wert in Service anpassen)
      this.fs.setReverseOrder(!this.reverseOrder);
    }

    //Sortierfeld setzen (Wert in Service anpassen)
    this.fs.setOrderField(field);
  }
}