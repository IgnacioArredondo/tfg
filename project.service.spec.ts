import { TestBed, inject } from '@angular/core/testing';

import { Project } from './project.service';

describe('ProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Project]
    });
  });

  it('should ...', inject([Project], (service: Project) => {
    expect(service).toBeTruthy();
  }));
});
