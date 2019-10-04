import { Component, OnInit } from '@angular/core';
import { ViewControlService } from '../../services/view-control.service';

@Component({
  selector: 'view-control',
  templateUrl: './view-control.component.html',
  styleUrls: ['./view-control.component.scss']
})
export class ViewControlComponent implements OnInit {

  //Welcher Bereich (Suche, Playlist) ist gerade aktiv und somit sichtbar
  activeView: string;

  constructor(private vcs: ViewControlService) { }

  ngOnInit() {

    //activeView (search vs. playlist) abbonieren
    this.vcs.getView().subscribe(view => this.activeView = view);
  }

  //Zwischen Views umschalten (Playlist, Search)
  setActive(view) {
    this.vcs.setView(view);
  }
}