import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Todo} from "../Todo";
import {map, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  readonly API: string = "http://localhost:8080/api/todo"
  todoSubject: Subject<any> = new Subject<any>()

  constructor(private httpClient: HttpClient) { }

  getAllTodos(): Observable<any>{
    return this.httpClient.get(this.API + "/all")
  }

  postTodo(todo: Todo): Observable<any>{
    return this.httpClient.post(this.API, todo)
  }

  updateTodo(todo: Todo): Observable<any>{
    return this.httpClient.put(this.API, todo)
  }

  deleteTodo(todo: Todo): Observable<any>{
    return this.httpClient.delete(this.API + "/" + todo.externalId)
  }

  notifyTodo(todo: Todo){
    this.todoSubject.next(todo)
  }

  getTodoSubject(): Observable<any> {
    return this.todoSubject;
  }
}
