import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearListModal } from './clear-list-modal';

describe('ClearListModal', () => {
  let component: ClearListModal;
  let fixture: ComponentFixture<ClearListModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearListModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ClearListModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
