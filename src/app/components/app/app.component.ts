import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BackendService } from 'app/services/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public constructor(private titleService: Title, private bs: BackendService) { }

  ngOnInit() {

    //HTML-Page-Title setzen, Kurze Namen Caps-Locked (mh -> MH), lange Titel nur 1. Buchstabe gross (luis -> Luis)
    this.bs.getPageTitle().subscribe((pageTitle: string) => {
      if (pageTitle) {
        const title = pageTitle.length > 2 ? pageTitle[0].toUpperCase() + pageTitle.substring(1) : pageTitle.toUpperCase();
        this.titleService.setTitle(title);
      }
    });
  }
}