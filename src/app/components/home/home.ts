import { ChangeDetectionStrategy, Component, inject, signal, ChangeDetectorRef, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { monoEdit, monoAdd, monoDelete } from '@ng-icons/mono-icons';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoModal } from '../edit-todo-modal/edit-todo-modal';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { LocalStorage } from '../../services/local-storage';

interface Todo {
    id: number,
    name: string
}

@Component({
  selector: 'app-home',
  imports: [FormsModule, NgIcon, MatButtonModule, CdkDrag, CdkDropList],
  templateUrl: './home.html',
  styleUrl: './home.css',
  viewProviders: [provideIcons({ monoEdit, monoAdd, monoDelete })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  constructor(private localStorageService: LocalStorage){}

  private cdr = inject(ChangeDetectorRef);
  readonly dialog = inject(MatDialog);
  readonly editedItem = signal('');
  readonly editedItemId = signal('');
  todo: string = "";
  todoList: Todo[] = [{id: 0, name: "Task 1"}, {id: 1, name: "Task 2"}];
  todoListSize: number = 0; 
  todoNameLimitSize: number = 100;

  ngOnInit(){
    this.getFromLocalStorage();
  }

  addTodoItem(todo: string){
    if(todo == ""){
      alert("Type a task to add it");
      return;
    }
    else if(todo.length > this.todoNameLimitSize){
      alert("The name of the to-do must be up to 100 characters long");
    }
    this.todoList.push({id: this.todoList.length, name: todo});
    this.todo = "";
    this.saveToLocalStorage();
    console.log(this.todoList);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: number): void {
    for(let i = 0; i < this.todoList.length; i++){
      if(this.todoList[i].id == id){
        this.editedItem.set(this.todoList[i].name);
        break;
      }
    }
    
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
      this.saveToLocalStorage();
      this.cdr.detectChanges();
    })
  }

  deleteTodoItem(id: number){
    for(let i = 0; i < this.todoList.length; i++){
      if(this.todoList[i].id == id){
        this.todoList.splice(i, 1);
        this.saveToLocalStorage();
        break;
      }
    }

    //TEMPORARY: rearange objects id's, so when you delete by id, there aren't duplicates
    /*
    for(let i = 0; i < this.todoList.length; i++){
      this.todoList[i].id = i;
    }
    */
    console.log(this.todoList);
  }

  drop(event: CdkDragDrop<object[]>){
    moveItemInArray(this.todoList, event.previousIndex, event.currentIndex);
    this.saveToLocalStorage();
  }

  saveToLocalStorage(): void{
    this.localStorageService.setItem(0+"", this.todoList);
  }

  getFromLocalStorage(): void{
    const value = this.localStorageService.getItem('0');
    this.todoList = JSON.parse(value ? value : "");
  }
}
