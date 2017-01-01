import { Injectable } from '@angular/core';
import { CalEventService } from './calEvent.service';
import { CalEvent } from '../models/calEvent';
import { Observable } from 'rxjs/Observable';

import { PushNotificationsService } from 'angular2-notifications';

@Injectable()
export class CalNotificationService {

  events: CalEvent[];
  intervalId: NodeJS.Timer;

  constructor(private _calEventSvc: CalEventService, private _pushNotifications: PushNotificationsService) { 
    this._calEventSvc.events.subscribe((res) => {
      this.events = res.map((e) => this._calEventSvc.toCalEvent(e));
    });
    this._pushNotifications.requestPermission();
  }

  onInit() {
    this.intervalId = setInterval(() => { this.checkCurrentEvent() }, 60 * 1000);
  }

  checkCurrentEvent() {
    this.events
      .filter((e) => e.shouldNotifyNow)
      .forEach((e) => this.sendEventNotification(e));
  }

  sendEventNotification(event: CalEvent) {
    this._pushNotifications
      .create(event.title, {body: `${event.title} will start on ${event.startDate.format('hh:mm')}.`  })
      .subscribe(
          res => console.log(res),
          err => console.log(err)
      );
  }

  onDestroy() {
    clearInterval(this.intervalId);
  }

}
