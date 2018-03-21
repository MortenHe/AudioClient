import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { AppComponent } from './components/app/app.component';
import { VideoService } from './services/video.service';
import { HttpModule } from '@angular/http';
import { ModeFilterPipe } from './pipes/mode-filter.pipe';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { AdminComponent } from './components/admin/admin.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    ModeFilterPipe,
    SearchFilterPipe,
    AdminComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    OrderModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: SearchComponent },
      { path: 'admin', component: AdminComponent },
      { path: '**', component: SearchComponent }
    ]),
  ],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }