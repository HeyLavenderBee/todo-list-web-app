import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClearListModal } from './clear-list-modal';

describe('ClearListModal', () => {
  let component: ClearListModal;
  let fixture: ComponentFixture<ClearListModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearListModal],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {close: () => {}}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {id: 1}
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClearListModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
