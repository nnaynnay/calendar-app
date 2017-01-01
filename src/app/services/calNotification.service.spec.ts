/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CalNotificationService } from './calNotification.service';

describe('CalNotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalNotificationService]
    });
  });

  it('should ...', inject([CalNotificationService], (service: CalNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
