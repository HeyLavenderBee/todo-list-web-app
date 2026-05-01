import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatFormField, MatInputModule, MatLabel } from "@angular/material/input";

export interface DialogData {
  id: number,
  editedItem: string
}

@Component({
  selector: 'app-edit-todo-modal',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, FormsModule, MatInput, MatFormField, MatLabel],
  templateUrl: './edit-todo-modal.html',
  styleUrl: './edit-todo-modal.css',
})
export class EditTodoModal {
  readonly dialogRef = inject(MatDialogRef<EditTodoModal>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly editedItem = model(this.data.editedItem);

  cancel(): void{
    this.dialogRef.close();
  }
}
