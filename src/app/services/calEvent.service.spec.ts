/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CalEventService } from './calEvent.service';

describe('EventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalEventService]
    });
  });

  it('should ...', inject([CalEventService], (service: CalEventService) => {
    expect(service).toBeTruthy();
  }));
});
