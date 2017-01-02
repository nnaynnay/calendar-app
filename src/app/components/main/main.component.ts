import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CalEventService } from '../../services/calEvent.service';
import { CalNotificationService } from '../../services/calNotification.service';
import { CalEvent } from '../../models/calEvent';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, OnDestroy {

  events: Observable<CalEvent[]>;

  event: CalEvent;

  headerConfig: any;

  defaultView: string;

  showEventDialog: boolean = false;

  constructor(
    private _calEventSvc: CalEventService,
    private _calNotificationSvc: CalNotificationService
  ) { 
    
  }

  ngOnInit() {
    this.events = this._calEventSvc.events;

    this.defaultView = "agendaWeek";

    this.headerConfig = {
      left: 'prev,next',
      center: 'title',
      right: 'today'
    };

    this._calNotificationSvc.onInit();

  }

  ngOnDestroy() {
    this._calNotificationSvc.onDestroy();
  }

  handleEventClick(e) {
    this.event = new CalEvent();
    this.event.id = e.calEvent.id;
    this.event.title = e.calEvent.title;
    this.event.start = e.calEvent.start.format(); 
    this.event.end = (e.calEvent.end) ? e.calEvent.end.format() : e.calEvent.end;
    this.event.enableNotification = e.calEvent.enableNotification;
    this.showEventDialog = true;
  }

  handleDayClick(e) {
    this.event = new CalEvent();
    this.event.start = e.date.format();
    this.event.end = e.date.add(1, 'hour').format();
    this.event.enableNotification = e.date.enableNotification;
    this.showEventDialog = true;
  }

  handleEventUpdate(e) {
    let event:CalEvent;
    event = <CalEvent>{
      id: e.event.id,
      title: e.event.title,
      start: e.event.start,
      end: e.event.end,
      enableNotification: e.event.enableNotification
    };
    this._calEventSvc.saveEvent(event);
  }

  saveEvent() {
    this._calEventSvc.saveEvent(this.event);
    this.showEventDialog = false;
  }

  deleteEvent() {
    this._calEventSvc.deleteEvent(this.event);
    this.showEventDialog = false;
  }

  deleteAllEvents() {
    this._calEventSvc.deleteAllEvents();
  }

}
