import { Component, OnInit } from '@angular/core';
import { ResultfilterService } from '../../services/resultfilter.service';
import { FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'toggletrackview',
  templateUrl: './toggletrackview.component.html',
  styleUrls: ['./toggletrackview.component.scss']
})

export class ToggletrackviewComponent implements OnInit {

  //Checkbox fuer Track-Anzeige
  showTracksCheckbox = new FormControl();

  //Service injecten
  constructor(private fs: ResultfilterService) { }

  //Beim Init
  ngOnInit() {

    //Aenderung bei Checkbox verfolgen und in Service schreiben
    this.showTracksCheckbox.valueChanges.subscribe(bool => this.fs.setShowTracks(bool));

    //Bei audio
    if (environment.appMode === 'audio') {

      //Tracks anzeigen zu Beginn
      this.showTracksCheckbox.setValue(true);
    }
  }
}