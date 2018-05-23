import { TestBed, inject } from '@angular/core/testing';

import { Resource } from './resource.service';

describe('ResourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Resource]
    });
  });

  it('should ...', inject([Resource], (service: Resource) => {
    expect(service).toBeTruthy();
  }));
});
