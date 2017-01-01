import { Injectable } from '@angular/core';
import { CalEvent } from '../models/calEvent';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CalEventService {
  events: Observable<CalEvent[]>;
  private _events: BehaviorSubject<CalEvent[]>;
  private _dataStore: {
      events: CalEvent[]
  }

  constructor() { 
      let initialEvents = [];
      this._dataStore = { events: [] };
      this._events = <BehaviorSubject<CalEvent[]>> new BehaviorSubject(initialEvents);
      this.events = this._events.asObservable();
  }

  get calEvents() {
      return this._dataStore.events;
  }

  saveEvent(event: CalEvent) {
      if (event.id) {
          // Update existing event.
          this._dataStore.events = this._dataStore.events.map((e) => {
              return (e.id === event.id) ? event : e ;
          });
      } else {
          // Create new event.
          event.id = [new Date().getTime(), Math.random()].join('_');
          this._dataStore.events.push(event);
      }
      this._events.next(Object.assign({}, this._dataStore).events);
  }

  deleteEvent(event: CalEvent) {
      this._dataStore.events = this._dataStore.events.filter(e => e.id !== event.id);
      this._events.next(Object.assign({}, this._dataStore).events);
  }

}
