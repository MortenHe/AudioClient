import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BackendService } from 'app/services/backend.service';
import { upperFirst } from 'lodash-es';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public constructor(private titleService: Title, private bs: BackendService) { }

  ngOnInit() {

    //HTML-Page-Title setzen, Kurze Namen Caps-Locked (mh -> MH), lange Titel nur 1. Buchstabe gross (luis -> Luis)
    this.bs.getUserMode().subscribe((userMode: string) => {
      if (userMode) {
        const title = userMode.length > 2 ? userMode[0].toUpperCase() + userMode.substring(1) : userMode.toUpperCase();
        this.titleService.setTitle(title);
      }
    });
  }
}