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
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, FormsModule, MatInput, MatFormField, MatLabel, MatDialogContent],
  templateUrl: './edit-todo-modal.html',
  styleUrl: './edit-todo-modal.css',
})
export class EditTodoModal {
  readonly dialogRef = inject(MatDialogRef<EditTodoModal>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly editedItem = model(this.data.editedItem);
  readonly receivedItem = this.editedItem();

  cancel(): void{
    this.dialogRef.close();
  }

  editTodo(){
    if(this.editedItem().length < 1){
      alert("The task's name need to be of at leat one character");
      //this.editedItem.set(this.receivedItem);
      return;
    } else if(this.editedItem().length > 100){
      alert("The task's name needs to be of up to 100 characters");
      //this.editedItem.set(this.receivedItem);
      return;
    }
    this.dialogRef.close(this.editedItem());
  }
}
