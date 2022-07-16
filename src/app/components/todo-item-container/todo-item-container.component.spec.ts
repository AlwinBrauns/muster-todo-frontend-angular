import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemContainerComponent } from './todo-item-container.component';

describe('TodoItemContainerComponent', () => {
  let component: TodoItemContainerComponent;
  let fixture: ComponentFixture<TodoItemContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoItemContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
