import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalEventService } from '../../services/calEvent.service';
import { CalNotificationService } from '../../services/calNotification.service';
import { CalEvent } from '../../models/calEvent';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  // styleUrls: ['./main.component.css']
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
      left: false,
      center: 'title',
      right: 'prev,next today'
    };

    this._calNotificationSvc.onInit();

  }

  ngOnDestroy() {
    this._calNotificationSvc.onDestroy();
  }

  handleEventClick(e) {
        this.event = new CalEvent();
        this.event.title = e.calEvent.title;
        
        let start = e.calEvent.start;
        let end = e.calEvent.end;

        this.event.id = e.calEvent.id;
        this.event.start = start.format(); 
        this.event.end = (end) ? end.format() : end;
        this.showEventDialog = true;
    }

  handleDayClick(e) {
    this.event = new CalEvent();
    this.event.start = e.date.format();
    this.event.end = e.date.add(1, 'hour').format();
    this.showEventDialog = true;
  }

  handleEventDragDrop(e) {
    let event:CalEvent;
    event = <CalEvent>{
      id: e.event.id,
      title: e.event.title,
      start: e.event.start,
      end: e.event.end
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
