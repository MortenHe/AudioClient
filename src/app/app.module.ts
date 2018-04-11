import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//eigenes Services
import { VideoService } from './services/video.service';
import { ResultfilterService } from './services/resultfilter.service';
import { PlaylistService } from './services/playlist.service';

//eigenes Pipes
import { ModeFilterPipe } from './pipes/mode-filter.pipe';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { TimeformatterPipe } from './pipes/timeformatter.pipe';

//eigene Komponenten
import { AppComponent } from './components/app/app.component';
import { SearchComponent } from './components/search/search.component';
import { AdminComponent } from './components/admin/admin.component';
import { ResultlistComponent } from './components/resultlist/resultlist.component';
import { ModefilterComponent } from './components/modefilter/modefilter.component';
import { SearchfilterComponent } from './components/searchfilter/searchfilter.component';
import { SortfilterComponent } from './components/sortfilter/sortfilter.component';
import { SelectmodeComponent } from './components/selectmode/selectmode.component';
import { CurrentplayedplaylistinspectorComponent } from './components/currentplayedplaylistinspector/currentplayedplaylistinspector.component';
import { PlaylistgeneratorComponent } from './components/playlistgenerator/playlistgenerator.component';
import { PlayercontrolComponent } from './components/playercontrol/playercontrol.component';
import { PicontrolComponent } from './components/picontrol/picontrol.component';
import { ResultlistinspectorComponent } from './components/resultlistinspector/resultlistinspector.component';
import { DebuginspectorComponent } from './components/debuginspector/debuginspector.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    SearchComponent,
    ResultlistComponent,
    TimeformatterPipe,
    ModefilterComponent,
    SearchfilterComponent,
    SortfilterComponent,
    SelectmodeComponent,
    CurrentplayedplaylistinspectorComponent,
    PlaylistgeneratorComponent,
    PlayercontrolComponent,
    PicontrolComponent,
    ResultlistinspectorComponent,
    DebuginspectorComponent,
    ModeFilterPipe,
    SearchFilterPipe,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'search/:mode', component: SearchComponent },
      { path: 'admin', component: AdminComponent },
      { path: '**', redirectTo: '/search/default', pathMatch: 'full' }
    ]),
  ],
  providers: [VideoService, PlaylistService, ResultfilterService, ModeFilterPipe, SearchFilterPipe, OrderByPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }