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

@NgModule({
  declarations: [
    AppComponent,
    ModeFilterPipe,
    SearchFilterPipe,
    AdminComponent,
    SearchComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'search/:video_mode', component: SearchComponent },
      { path: 'admin/:video_mode', component: AdminComponent },
      { path: '**', redirectTo: '/search/kinder', pathMatch: 'full' }
    ]),
  ],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }