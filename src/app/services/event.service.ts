import { Injectable } from '@angular/core';

@Injectable()
export class EventService {

  constructor() { }

  getEvents() {
    return [
        {
            "title": "All Day Event",
            "start": "2016-12-27"
        },
        {
            "title": "Long Event",
            "start": "2016-12-07",
            "end": "2016-12-10"
        },
        {
            "title": "Repeating Event",
            "start": "2016-12-09T16:00:00"
        },
        {
            "title": "Repeating Event",
            "start": "2016-12-16T16:00:00"
        },
        {
            "title": "Conference",
            "start": "2016-12-11",
            "end": "2016-12-13"
        }
    ];
  }

}
