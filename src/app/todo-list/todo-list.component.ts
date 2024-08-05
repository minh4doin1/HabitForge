import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoListService } from '../services/todolist.service';
import { Task, TaskList, TaskSection } from '../models/todo-list.model';
import { HttpClient } from '@angular/common/http';
@Component({
  imports: [CommonModule, FormsModule],
  standalone: true,
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  
  @Output() closeListEvent = new EventEmitter<void>();
  taskSections: TaskSection[] = [
 
  ];
  
  draggingTask: Task | null = null;
  draggingList: TaskList | null = null;
  selectedTask: Task | null = null;
  selectedList: TaskList | null = null;

  isMultiSelect: boolean = false;
  selectedItems: { task?: Task; list?: TaskList }[] = [];
  taskActionsVisible: boolean = false;
  listActionsVisible: boolean = false;

  constructor(private todoListService: TodoListService,private http: HttpClient) {
   
  }
  ngOnInit() {
    this.loadTaskSections();
  }
  loadTaskSections() {
    this.todoListService.getTaskSections().subscribe(
      (sections: TaskSection[]) => {
        console.log('Loaded sections:', sections);
        this.taskSections = sections.map(section => ({
          ...section,
          collapsed: section.collapsed ?? false
        }));
        console.log('Initialized taskSections:', this.taskSections);
      },
      error => {
        console.error('Error loading task sections:', error);
      }
    );
  }
  closeList() {
    this.closeListEvent.emit();
    this.selectedList = null; // Đóng danh sách và đặt lại selectedList
  }
  
  
  
  
  //popup actions
  toggleTaskActions(task: Task, list: TaskList) {
    if (this.selectedTask === task && this.selectedList === list) {
      this.taskActionsVisible = !this.taskActionsVisible;
    } else {
      this.selectedTask = task;
      this.selectedList = list;
      this.taskActionsVisible = true;
    }
  }

  toggleListActions(list: TaskList) {
    if (this.selectedList === list) {
      this.listActionsVisible = !this.listActionsVisible;
    } else {
      this.selectedList = list;
      this.listActionsVisible = true;
    }
  }

  isTaskActionsVisible(task: Task, list: TaskList): boolean {
    return (
      this.selectedTask === task &&
      this.selectedList === list &&
      this.taskActionsVisible
    );
  }

  isListActionsVisible(list: TaskList): boolean {
    return this.selectedList === list && this.listActionsVisible;
  }

  onDeleteDrop(event: DragEvent) {
    event.preventDefault();
    if (this.draggingTask && this.draggingList) {
      const listIndex = this.draggingList.tasks.indexOf(this.draggingTask);
      if (listIndex !== -1) {
        this.draggingList.tasks.splice(listIndex, 1);
      }
    } else if (this.draggingList) {
      const section = this.findSectionContainingList(this.draggingList);
      if (section) {
        const listIndex = section.taskLists.indexOf(this.draggingList);
        if (listIndex !== -1) {
          section.taskLists.splice(listIndex, 1);
        }
      }
    }
    this.resetDragState();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  toggleMultiSelect() {
    this.isMultiSelect = !this.isMultiSelect;
    if (!this.isMultiSelect) {
      this.selectedItems = [];
    }
  }

  selectItem(event: MouseEvent, item: { task?: Task; list?: TaskList }) {
    if (this.isMultiSelect) {
      event.stopPropagation();
      const index = this.selectedItems.indexOf(item);
      if (index === -1) {
        this.selectedItems.push(item);
      } else {
        this.selectedItems.splice(index, 1);
      }
    }
  }

  performAction(action: string) {
    this.selectedItems.forEach((item) => {
      if (action === 'delete') {
        if (item.task && item.list) {
          const index = item.list.tasks.indexOf(item.task);
          if (index !== -1) {
            item.list.tasks.splice(index, 1);
          }
        } else if (item.list) {
          const section = this.findSectionContainingList(item.list);
          if (section) {
            const index = section.taskLists.indexOf(item.list);
            if (index !== -1) {
              section.taskLists.splice(index, 1);
            }
          }
        }
      }
      // Thêm các hành động khác như "complete" ở đây
    });
    this.selectedItems = [];
    this.isMultiSelect = false;
  }

  onTaskDragStart(event: DragEvent, task: Task, list: TaskList) {
    this.draggingTask = task;
    this.draggingList = list;
  }

  onListDragStart(event: DragEvent, list: TaskList) {
    this.draggingList = list;
  }

  onTaskDrop(event: DragEvent, targetList: TaskList) {
    event.preventDefault();
    if (this.draggingTask && this.draggingList) {
      targetList.tasks.push(this.draggingTask);
      if (this.draggingList !== targetList) {
        const index = this.draggingList.tasks.indexOf(this.draggingTask);
        if (index !== -1) {
          this.draggingList.tasks.splice(index, 1);
        }
      }
    }
    this.resetDragState();
  }

  onListDrop(event: DragEvent, targetSection: TaskSection) {
    event.preventDefault();
    if (this.draggingList) {
      const sourceSection = this.findSectionContainingList(this.draggingList);
      if (sourceSection && sourceSection !== targetSection) {
        const index = sourceSection.taskLists.indexOf(this.draggingList);
        if (index !== -1) {
          sourceSection.taskLists.splice(index, 1);
        }
        targetSection.taskLists.push(this.draggingList);
      }
    }
    this.resetDragState();
  }

  editListTitle(sectionIndex: number, listIndex: number): void {
    const newListTitle = prompt('Enter new list title:');
    if (newListTitle !== null && newListTitle.trim() !== '') {
      this.todoListService.updateTaskList(
        this.taskSections[sectionIndex].taskLists[listIndex]._id,
        newListTitle
      ).subscribe(updatedList => {
        this.taskSections[sectionIndex].taskLists[listIndex] = updatedList;
      });
    }
  }

  editTask(task: Task): void {
    this.selectedTask = task;
  }

  saveTask(task: Task): void {
    if (task) {
      // Logic lưu task (nếu cần thiết)
      this.selectedTask = null; // Đóng popup sau khi lưu
      this.taskActionsVisible = false; // Ẩn hành động sau khi lưu
    }
  }

  cancelEditTask(): void {
    this.selectedTask = null; // Đóng popup mà không lưu thay đổi
    this.taskActionsVisible = false; // Đóng popup và ẩn hành động
  }

 

  addTask(list: TaskList) {
    const taskName = prompt('Enter task name:');
    if (taskName) {
      this.todoListService.createTask(list._id, taskName, '')
        .subscribe((newTask) => {
          list.tasks.push(newTask);
        });
    }
  }

  addList(section: TaskSection) {
    console.log('Section:', section);
  
    if (section) {
      const listName = prompt('Enter list name:');
      if (listName) {
        this.todoListService.createTaskList(listName)
          .subscribe((newList) => {
            section.taskLists.push(newList);
          });
      }
    } else {
      console.error('Section is undefined. Cannot add list.');
    }
  }
  
  
  
  

  toggleSection(section: TaskSection) {
    section.collapsed = !section.collapsed;
  }

  onTaskDragOver(event: DragEvent) {
    event.preventDefault();
    const targetElement = event.target as HTMLElement;
    if (targetElement.classList.contains('task-card')) {
      targetElement.classList.add('drag-over');
    }
  }

  onTaskDragLeave(event: DragEvent) {
    const targetElement = event.target as HTMLElement;
    if (targetElement.classList.contains('task-card')) {
      targetElement.classList.remove('drag-over');
    }
  }

  onListDragOver(event: DragEvent) {
    event.preventDefault();
    const targetElement = event.target as HTMLElement;
    if (targetElement.classList.contains('task-list-container')) {
      targetElement.classList.add('drag-over');
    }
  }

  onListDragLeave(event: DragEvent) {
    const targetElement = event.target as HTMLElement;
    if (targetElement.classList.contains('task-list-container')) {
      targetElement.classList.remove('drag-over');
    }
  }

  resetDragState() {
    this.draggingTask = null;
    this.draggingList = null;
  }

  findSectionContainingList(list: TaskList): TaskSection | null {
    for (const section of this.taskSections) {
      if (section.taskLists.includes(list)) {
        return section;
      }
    }
    return null;
  }
}
