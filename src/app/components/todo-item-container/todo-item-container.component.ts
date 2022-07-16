import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {Todo} from "../../Todo";
import {TodoService} from "../../services/todo.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-todo-item-container',
  templateUrl: './todo-item-container.component.html',
  styleUrls: ['./todo-item-container.component.scss']
})
export class TodoItemContainerComponent implements OnInit {

  todos: Todo[] = []
  todoSubscription: Subscription = new Subscription()
  edit: any = {open: false, todo: {}}

  constructor(private todoService: TodoService, private containerRef: ElementRef) {
    this.todoSubscription = todoService.getTodoSubject().subscribe(value=>{
      const equalItem = this.todos.filter((todo)=>todo.externalId===value.externalId);
      if(equalItem.length>0){
        this.todos[this.todos.indexOf(equalItem[0])] = value
      }else {
        this.todos.push(value)
      }
    })
  }

  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe(value => this.todos = value)
  }

  onDone(todo: Todo) {
    let updatedTodo = { ...todo, checked: !todo.checked }
    this.todoService.updateTodo(updatedTodo).subscribe(value => {
      this.todos[this.todos.indexOf(todo)] = value
    })
  }

  onOpenEdit($event: any) {
    this.edit = $event;
  }

  @HostListener('window:click', ['$event']) clickOutside(event: any){
    if((!this.containerRef.nativeElement.contains(event.target) && this.edit.open)){
      this.onOpenEdit({open: false, todo: {}})
    }
  }

  onCloseEdit(): void {
    this.onOpenEdit({open: false, todo: {}})
  }

  onDeleteTodo($event: Todo): void {
    this.todos = this.todos.filter(todo=>todo.externalId!==$event.externalId)
  }
}
