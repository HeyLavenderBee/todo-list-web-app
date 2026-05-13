import { ChangeDetectionStrategy, Component, inject, signal, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Header } from '../header/header';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { monoEdit, monoAdd, monoDelete } from '@ng-icons/mono-icons';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoModal } from '../edit-todo-modal/edit-todo-modal';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { LocalStorage } from '../../services/local-storage';
import { NgClass } from '@angular/common';
import { ClearListModal } from '../clear-list-modal/clear-list-modal';

interface Todo {
    id: string,
    name: string,
    done: boolean
}

@Component({
  selector: 'app-home',
  imports: [FormsModule, NgIcon, MatButtonModule, CdkDrag, CdkDropList, NgClass],
  templateUrl: './home.html',
  styleUrl: './home.css',
  viewProviders: [provideIcons({ monoEdit, monoAdd, monoDelete })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  constructor(private localStorageService: LocalStorage, private router: Router){}

  private route = inject(ActivatedRoute);
  userName: string | null = "";

  private cdr = inject(ChangeDetectorRef);
  readonly dialog = inject(MatDialog);
  readonly clearDialog = inject(MatDialog);
  readonly editedItem = signal('');
  readonly clearList = signal(false);
  todo: string = "";
  todoList: Todo[] = [{id: self.crypto.randomUUID(), name: "Task 1", done: false}, {id: self.crypto.randomUUID(), name: "Task 2", done: false}];
  todoNameLimitSize: number = 100;

  redirectToLogin(): void{
   this.route.queryParams.subscribe((params) => {
    this.userName = params['userName']
   });
   this.cdr.detectChanges();
  }

  ngOnInit(): void{
    this.getFromLocalStorage();
    this.redirectToLogin();
  }

  goToRegister(): void{
    this.router.navigate(['/register']);
  }

  goToLogin(): void{
    this.router.navigate(['/login']);
  }

  addTodoItem(todo: string): void{
    if(this.todoList.length >= 100){
      alert("There is a limit of 200 tasks for user. Please, delete one to add a new task");
      return;
    }
    if(todo == ""){
      alert("Type a task to add it");
      return;
    }
    else if(todo.length > this.todoNameLimitSize){
      alert("The name of the to-do must be up to 100 characters long");
      return;
    }
    this.todoList.push({id: self.crypto.randomUUID(), name: todo, done: false});
    this.todo = "";
    this.saveToLocalStorage();
  }

  checkTodoItem(id: string): void{
    const task = this.todoList.find(task => task.id === id);
    if(task != undefined){
      //marks the opposite it is now
      task.done = !task.done;
      if(task.done){
        //reorder the tasks, for all the completed ones to be at the bottom
        for(let i = 0; i < this.todoList.length; i++){
          if(this.todoList[i].id == id && this.todoList[i].done){
            let todo = this.todoList[i];
            this.todoList.splice(i, 1)[0];
            this.todoList.splice(this.todoList.length, 0, todo);
            break;
          }
        }
      } else{
        //puts the unchecked item to the top of the list
        for(let i = 0; i < this.todoList.length; i++){
          if(this.todoList[i].id == id && !this.todoList[i].done){
            let todo = this.todoList[i];
            this.todoList.splice(i, 1)[0];
            this.todoList.unshift(todo);
            console.log(this.todoList);
            break;
          }
        }
      }
    }
    this.saveToLocalStorage();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: string): void {
    //set the var editedItem with the item chosen for editing by finding it by its id
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

      //instead of making a for loop, this is a way to find the task by id!
      const taskToEdit = this.todoList.find(task => task.id === id);
      if(taskToEdit){
        taskToEdit.name = result;
      }
      this.saveToLocalStorage();
      this.cdr.detectChanges();
    })
  }

  clearItems(enterAnimationDuration: string, exitAnimationDuration: string): void{
    const dialogRef = this.dialog.open(ClearListModal, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {clearList: this.clearList()}
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result){
        console.log("deletado");
        this.todoList = [];
        this.saveToLocalStorage();
        this.cdr.detectChanges();
        return;
      }
    })
  }

  deleteTodoItem(id: string): void{
    //finds the item in the todo list to remove it
    //it has a for loop because each item is an object inside an array, and the id is located inside the object
    //TODO: later update it with find() function
    for(let i = 0; i < this.todoList.length; i++){
      if(this.todoList[i].id == id){
        this.todoList.splice(i, 1);
        this.saveToLocalStorage();
        return;
      }
    }
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
    this.todoList = JSON.parse(value ? value : "[]");
    for(let i = 0; i < this.todoList.length; i++){
    }
  }
}
