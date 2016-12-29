import { Injectable } from '@angular/core';
import { CalEvent } from '../models/calEvent';

@Injectable()
export class CalEventService {
  events: CalEvent[];

  constructor() { 
        this.events = [
            <CalEvent>{
                id: 'id123',
                title: "Testing",
                start: new Date(),
                end: new Date(),
                isAllDay: false
            }
        ];
  }

  getEvents() {
      return this.events; 
  }

  saveEvent(event: CalEvent) {
      if (event.id) {
          this.events = this.events.map((e) => {
              return (e.id === event.id) ? event : e ;
          });
      } else {
          this.events.push(event);
      }
  }

  deleteEvent(event: CalEvent) {
      this.events = this.events.filter(e => e.id !== event.id);
  }

}
