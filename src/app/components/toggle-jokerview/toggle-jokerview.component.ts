import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ResultfilterService } from '../../services/resultfilter.service';

@Component({
  selector: 'toggle-jokerview',
  templateUrl: './toggle-jokerview.component.html',
  styleUrls: ['./toggle-jokerview.component.scss']
})
export class ToggleJokerviewComponent implements OnInit {

  //Checkbox fuer Joker-Anzeige
  showJokerCheckbox = new FormControl();

  constructor(private fs: ResultfilterService) { }

  ngOnInit() {

    //Aenderung bei Checkbox verfolgen und in Service schreiben
    this.showJokerCheckbox.valueChanges.subscribe(bool => this.fs.setShowJoker(bool));

    //Wenn sich Variable (von aussen) aendert
    this.fs.getShowJoker().subscribe(bool => {

      //Wert in Checkbox anpassen, aber kein Event feuern
      this.showJokerCheckbox.setValue(bool, { emitEvent: false });
    });
  }

}
