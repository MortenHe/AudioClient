import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//eigenes Services
import { VideoService } from './services/video.service';

//eigenes Pipes
import { ModeFilterPipe } from './pipes/mode-filter.pipe';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';

//Komponenten
import { AppComponent } from './components/app/app.component';
import { SearchComponent } from './components/search/search.component';
import { AdminComponent } from './components/admin/admin.component';
import { ResultlistComponent } from './components/resultlist/resultlist.component';
import { PlaylistService } from './services/playlist.service';
import { TimeformatterPipe } from './pipes/timeformatter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ModeFilterPipe,
    SearchFilterPipe,
    AdminComponent,
    SearchComponent,
    OrderByPipe,
    ResultlistComponent,
    TimeformatterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'search/:videoMode', component: SearchComponent },
      { path: 'admin', component: AdminComponent },
      { path: '**', redirectTo: '/search/kinder', pathMatch: 'full' }
    ]),
  ],
  providers: [VideoService, PlaylistService],
  bootstrap: [AppComponent]
})
export class AppModule { }