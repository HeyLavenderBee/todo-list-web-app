import { Component, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';
import { MatLabel } from "@angular/material/input";
import { DialogData, EditTodoModal } from '../edit-todo-modal/edit-todo-modal';

export interface ClearDialogData{
  clearList: boolean
}

@Component({
  selector: 'app-clear-list-modal',
  imports: [MatDialogContent, MatLabel, MatDialogActions, MatButtonModule, MatDialogTitle],
  templateUrl: './clear-list-modal.html',
  styleUrl: './clear-list-modal.css',
})
export class ClearListModal {
  readonly dialogRef = inject(MatDialogRef<ClearListModal>);
  readonly data = inject<ClearDialogData>(MAT_DIALOG_DATA);
  readonly clearList = model(this.data.clearList);

  cancel(): void{
    this.dialogRef.close();
  }

  clearItems(): void{
    this.clearList.set(true)
    this.dialogRef.close(this.clearList());
  }
}
