import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  //App-Name aus Config holen
  envName = environment.envName;

  public constructor(private titleService: Title) { }

  ngOnInit() {

    //HTML-Page-Title setzen
    this.titleService.setTitle(this.envName);
  }
}