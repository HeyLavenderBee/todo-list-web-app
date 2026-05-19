import { TestBed } from '@angular/core/testing';

import { GetTodos } from './get-todos';

describe('GetTodos', () => {
  let service: GetTodos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTodos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
