import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CalEventService } from './services/calEvent.service';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';

import { 
  ScheduleModule, 
  DialogModule,
  InputMaskModule,
  CalendarModule,
  CheckboxModule,
  ButtonModule
} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ScheduleModule,
    DialogModule,
    InputMaskModule,
    CalendarModule,
    CheckboxModule,
    ButtonModule
  ],
  providers: [
    CalEventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
