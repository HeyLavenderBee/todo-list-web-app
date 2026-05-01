import { ChangeDetectionStrategy, Component, inject, signal, ChangeDetectorRef } from '@angular/core';
import { Header } from '../header/header';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { monoEdit } from '@ng-icons/mono-icons';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoModal } from '../edit-todo-modal/edit-todo-modal';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

interface Todo {
    id: number,
    name: string
}

@Component({
  selector: 'app-home',
  imports: [Header, FormsModule, NgIcon, MatButtonModule, CdkDrag, CdkDropList],
  templateUrl: './home.html',
  styleUrl: './home.css',
  viewProviders: [provideIcons({ monoEdit })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private cdr = inject(ChangeDetectorRef);
  readonly dialog = inject(MatDialog);
  readonly editedItem = signal('');
  readonly editedItemId = signal('');
  todo: string = "";
  todoList: Todo[] = [{id: 0, name: "Task 1"}, {id: 1, name: "Task 2"}];
  todoListSize: number = 0; 

  addTodoItem(todo: string){
    if(todo == ""){
      alert("Type a task to add it");
      return;
    }
    this.todoList.push({id: this.todoList.length, name: todo});
    this.todo = "";
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: number): void {
    this.editedItem.set(this.todoList[id].name);
    const dialogRef = this.dialog.open(EditTodoModal, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {id: id, editedItem: this.editedItem()}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == ""){
        alert("Task wasn't edited: there needs to be a content for it to be edited")
        return;
      }
      else if(result == undefined){
        return;
      }
      this.todoList[id].name = result;
      this.cdr.detectChanges();
    })
  }

  drop(event: CdkDragDrop<object[]>){
    moveItemInArray(this.todoList, event.previousIndex, event.currentIndex);
  }
}
