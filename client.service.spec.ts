import { TestBed, inject } from '@angular/core/testing';

import { Client } from './client.service';

describe('ClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Client]
    });
  });

  it('should ...', inject([Client], (service: Client) => {
    expect(service).toBeTruthy();
  }));
});
