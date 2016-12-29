import { Component, OnInit } from '@angular/core';
import { CalEventService } from '../../services/calEvent.service';
import { CalEvent } from '../../models/calEvent';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  // styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  events: CalEvent[];

  event: CalEvent;

  headerConfig: any;

  defaultView: string;

  showEventDialog: boolean = false;

  constructor(private _calEventSvc: CalEventService) { }

  ngOnInit() {
    
    this.defaultView = "agendaWeek";

    this.headerConfig = {
      left: false,
      center: 'title',
      right: 'prev,next today'
    };

    this.events = this._calEventSvc.getEvents();

  }

  handleEventClick(e) {
        this.event = new CalEvent();
        this.event.title = e.calEvent.title;
        
        let start = e.calEvent.start;
        let end = e.calEvent.end;
        if(e.view.name === 'month') {
            start.stripTime();
        }
        
        if(end) {
            end.stripTime();
            this.event.end = end.format();
        }

        this.event.id = e.calEvent.id;
        this.event.start = start.format();
        this.event.isAllDay = e.calEvent.allDay;
        this.showEventDialog = true;
    }

  handleDayClick(e) {
    this.event = new CalEvent();
    this.event.start = e.date.format();
    this.showEventDialog = true;
  }

  saveEvent() {
    this._calEventSvc.saveEvent(this.event);
    this.showEventDialog = false;
  }

  deleteEvent() {
    this._calEventSvc.deleteEvent(this.event);
    this.showEventDialog = false;
  }

}
