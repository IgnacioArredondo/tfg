import { TestBed, inject } from '@angular/core/testing';

import { Activity} from './activity.service';

describe('ActivityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Activity]
    });
  });

  it('should ...', inject([Activity], (service: Activity) => {
    expect(service).toBeTruthy();
  }));
});
