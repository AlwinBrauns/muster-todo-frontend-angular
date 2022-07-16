import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faEdit, faCheck} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import {Todo} from "../../Todo";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo = {text: "", checked: false}
  @Output() openEdit: EventEmitter<any> = new EventEmitter<any>()
  faEdit: IconDefinition = faEdit;
  faCheck: IconDefinition = faCheck;
  constructor() { }

  ngOnInit(): void {
  }

  onEdit(): void {
    this.openEdit.emit({
      open: true,
      todo: this.todo,
    })
  }

}
