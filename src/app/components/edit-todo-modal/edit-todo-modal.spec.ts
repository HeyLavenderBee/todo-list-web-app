import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditTodoModal } from './edit-todo-modal';

describe('EditTodoModal', () => {
  let component: EditTodoModal;
  let fixture: ComponentFixture<EditTodoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTodoModal],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {close: () => {}}
        },
        { 
          provide: MAT_DIALOG_DATA,
          useValue: {id: 1, editedItem: 'Test Item'}
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTodoModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
