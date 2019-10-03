import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//eigenes Services
import { BackendService } from './services/backend.service';
import { ResultfilterService } from './services/resultfilter.service';
import { JsondataService } from './services/jsondata.service';
import { ViewControlService } from './services/view-control.service';

//eigenes Pipes
import { ModeFilterPipe } from './pipes/mode-filter.pipe';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { TimeformatterPipe } from './pipes/timeformatter.pipe';
import { FileNamePipe } from './pipes/file-name.pipe';

//eigenes Directives
import { ToggleCheckboxDirective } from './directives/toggle-checkbox.directive';

//eigene Komponenten
import { AppComponent } from './components/app/app.component';
import { SearchComponent } from './components/search/search.component';
import { ResultlistComponent } from './components/resultlist/resultlist.component';
import { ModefilterComponent } from './components/modefilter/modefilter.component';
import { SearchfilterComponent } from './components/searchfilter/searchfilter.component';
import { SortfilterComponent } from './components/sortfilter/sortfilter.component';
import { SelectmodeComponent } from './components/selectmode/selectmode.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { PlayercontrolComponent } from './components/playercontrol/playercontrol.component';
import { PicontrolComponent } from './components/picontrol/picontrol.component';
import { ToggletrackviewComponent } from './components/toggletrackview/toggletrackview.component';
import { RandomPlaybackComponent } from './components/random-playback/random-playback.component';
import { VolumeControlComponent } from './components/volume-control/volume-control.component';
import { ConnectionComponent } from './components/connection/connection.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultlistComponent,
    TimeformatterPipe,
    ModefilterComponent,
    SearchfilterComponent,
    SortfilterComponent,
    SelectmodeComponent,
    PlaylistComponent,
    PlayercontrolComponent,
    PicontrolComponent,
    ToggletrackviewComponent,
    ModeFilterPipe,
    SearchFilterPipe,
    OrderByPipe,
    ToggleCheckboxDirective,
    RandomPlaybackComponent,
    VolumeControlComponent,
    FileNamePipe,
    ConnectionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'search/:mode', component: SearchComponent },
      { path: '**', redirectTo: '/search/default', pathMatch: 'full' }
    ]),
  ],
  providers: [BackendService, ResultfilterService, JsondataService, ViewControlService, ModeFilterPipe, SearchFilterPipe, OrderByPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }