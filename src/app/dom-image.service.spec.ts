import { TestBed } from '@angular/core/testing';

import { DomImageService } from './dom-image.service';

describe('DomImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DomImageService = TestBed.get(DomImageService);
    expect(service).toBeTruthy();
  });
});
