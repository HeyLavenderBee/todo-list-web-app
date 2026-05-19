import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs';

interface TodoDb{
  id: string;
  todo_name: string;
  list_id: string;
}

@Injectable({
  providedIn: 'root',
})
export class GetTodos {
  private apiUrl: string = "https://localhost:7089/api/todo/gettodos";
  private todosSubject = new BehaviorSubject<any[]>([]);
  todos$ = this.todosSubject.asObservable();

  constructor(private http: HttpClient){}

  getTodos(){
    return this.http.get<TodoDb>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error("Ops, there was not possible to estabilish a connection to the server"));
      })
    );
  }
}
