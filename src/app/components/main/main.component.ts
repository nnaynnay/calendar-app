import { Component, OnInit } from '@angular/core';
import { CalEventService } from '../../services/calEvent.service';
import { CalEvent } from '../../models/calEvent';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  // styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  events: Observable<CalEvent[]>;

  event: CalEvent;

  headerConfig: any;

  defaultView: string;

  showEventDialog: boolean = false;

  constructor(private _calEventSvc: CalEventService) { 
    
  }

  ngOnInit() {
    this.events = this._calEventSvc.events;

    this.defaultView = "agendaWeek";

    this.headerConfig = {
      left: false,
      center: 'title',
      right: 'prev,next today'
    };

  }

  handleEventClick(e) {
        this.event = new CalEvent();
        this.event.title = e.calEvent.title;
        
        let start = e.calEvent.start;
        let end = e.calEvent.end;
        if(e.view.name === 'month') {
            // start.stripTime();
        }
        
        if(end) {
            //end.stripTime();
        }

        this.event.id = e.calEvent.id;
        this.event.start = new Date(start.format("YYYY-MM-DD HH:mm:ss"));
        this.event.end = (end) ? new Date(end.format("YYYY-MM-DD HH:mm:ss")) : end;
        this.event.isAllDay = e.calEvent.allDay;
        this.showEventDialog = true;
    }

  handleDayClick(e) {
    this.event = new CalEvent();
    this.event.start = new Date(e.date.format("YYYY-MM-DD HH:mm:ss"));
    this.event.end = new Date(e.date.format("YYYY-MM-DD HH:mm:ss"));
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
