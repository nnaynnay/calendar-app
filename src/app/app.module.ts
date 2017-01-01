import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CalEventService } from './services/calEvent.service';
import { CalNotificationService } from './services/calNotification.service';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';

import { PushNotificationsModule } from 'angular2-notifications';
import { 
  ScheduleModule, 
  DialogModule,
  InputMaskModule,
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
    CheckboxModule,
    ButtonModule,
    PushNotificationsModule
  ],
  providers: [
    CalEventService,
    CalNotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
