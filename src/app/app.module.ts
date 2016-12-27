import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { EventService } from './services/event.service';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';

import { ScheduleModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ScheduleModule
  ],
  providers: [
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
