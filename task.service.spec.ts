import { TestBed, inject } from '@angular/core/testing';

import { Task } from './task.service';

describe('ClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Task]
    });
  });

  it('should ...', inject([Task], (service: Task) => {
    expect(service).toBeTruthy();
  }));
});
