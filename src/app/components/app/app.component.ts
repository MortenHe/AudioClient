import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public constructor(private titleService: Title) { }

  ngOnInit() {

    //HTML-Page-Title setzen
    //TODO ueber Server nachtraeglich setzen
    this.titleService.setTitle("Audio Test");
  }
}