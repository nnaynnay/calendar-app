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
      let initialEvents: CalEvent[] = this.loadInitialEvents();
      this._dataStore = { events: initialEvents };
      this._events = <BehaviorSubject<CalEvent[]>> new BehaviorSubject(initialEvents);
      this.events = this._events.asObservable();
  }

  loadInitialEvents() {
      return (<CalEvent[]>this.getLocalStorage('events') || []).map((e) => this.toCalEvent(e));
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
      this.pushUpdates();
  }

  deleteEvent(event: CalEvent) {
      this._dataStore.events = this._dataStore.events.filter(e => e.id !== event.id);
      this.pushUpdates();
  }

  deleteAllEvents() {
      this._dataStore.events = [];
      this.pushUpdates();
  }

  pushUpdates() {
      this.setLocalStorage('events', this._dataStore.events);
      this._events.next(Object.assign({}, this._dataStore).events);
  }

  setLocalStorage(key: string, value: any) {
     localStorage.setItem(key, JSON.stringify(value)); 
  }

  getLocalStorage(key) {
      return JSON.parse(localStorage.getItem(key));
  }

  toCalEvent(e) {
      return new CalEvent(e.id, e.title, e.start, e.end, e.enableNotification);
  }

}
