import { TestBed, inject } from '@angular/core/testing';

import { User } from './user.service';

describe('ResourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [User]
    });
  });

  it('should ...', inject([User], (service: User) => {
    expect(service).toBeTruthy();
  }));
});
