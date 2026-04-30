import { Component } from '@angular/core';
import { Header } from '../header/header';
import { FormsModule } from '@angular/forms';

interface Todo {
    id: number,
    name: string
}

@Component({
  selector: 'app-home',
  imports: [Header, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  todo: string = "";
  todoList: Todo[] = [{id: 0, name: "tarefa 1"}, {id: 1, name: "tarefa 2"}];
  todoListSize: number = 0;
  a = {name: "hey"};

  addTodoItem(todo: string){
    this.todoList.push({id: this.todoList.length, name: todo});
    console.log(this.todoList[0].name);
  }

  editTodoItem(id: number){
    this.todoList[id].name = "Wonderhoy"
  }
}
