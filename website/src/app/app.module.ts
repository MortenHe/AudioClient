import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { OrderModule } from 'ngx-order-pipe';


import { AppComponent } from './app.component';
import { VideoService } from './video.service';
import { HttpModule } from '@angular/http';
import { ModeFilterPipe } from './mode-filter.pipe';
import { SearchFilterPipe } from './search-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ModeFilterPipe,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    OrderModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
