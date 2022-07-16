import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TodoService} from "../../services/todo.service";
import {Todo} from "../../Todo";

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {

  @Input() edit: any = null
  @Output() shouldClose: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>()

  textControl: FormControl = new FormControl('')
  formEdit: FormGroup = new FormGroup({
    text: this.textControl
  })
  shouldDelete: boolean = false

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.textControl.setValue(this.edit.todo.text)
  }

  onChangeTodo(): void {
    if(this.shouldDelete){
      this.todoService.deleteTodo(this.edit.todo).subscribe()
      this.deleteTodo.emit(this.edit.todo)
    }else {
      const updatedTodo = {...this.edit.todo, ...this.formEdit.value}
      this.todoService.updateTodo(updatedTodo).subscribe(value => {
        this.todoService.notifyTodo(value)
      })
    }
    this.shouldClose.emit(true)
  }
}
