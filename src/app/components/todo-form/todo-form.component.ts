import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Todo} from "../../Todo";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  addTodoForm: FormGroup = new FormGroup(
    {
      text: new FormControl('')
    }
  );

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const todo = {
      ...this.addTodoForm.value,
      checked: false
    }
    this.todoService.postTodo(todo).subscribe(value => {
      this.todoService.notifyTodo(value)
    })
    this.addTodoForm.reset()
  }

}
