import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  title: string;
  description: string;
}

interface TaskList {
  title: string;
  tasks: Task[];
}

interface TaskSection {
  highPriorityTasks: Task[];
  allTasks: Task[];
  completedTasks: Task[];
  title: string;
  taskLists: TaskList[];
  collapsed: boolean;
}
@Component({
  imports:[CommonModule,FormsModule],
  standalone:true,
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  @Output() closeListEvent = new EventEmitter<void>();
  section: any;
  taskSections: TaskSection[] = [
    {
      title: 'High Priority',
      taskLists: [],
      highPriorityTasks: [],
      allTasks: [],
      completedTasks: [],
      collapsed: false
    },
    {
      title: 'All Tasks',
      taskLists: [],
      highPriorityTasks: [],
      allTasks: [],
      completedTasks: [],
      collapsed: false
    },
    {
      title: 'Completed',
      taskLists: [],
      highPriorityTasks: [],
      allTasks: [],
      completedTasks: [],
      collapsed: false
    }
  ];
  draggingTask: Task | null = null;
  draggingList: TaskList | null = null;
  list!: TaskList ;
  selectedTask: Task | null = null;

  editListTitle(sectionIndex: number, listIndex: number): void {
    const newListTitle = prompt('Enter new list title:');
    if (newListTitle !== null && newListTitle.trim() !== '') {
      this.taskSections[sectionIndex].taskLists[listIndex].title = newListTitle;
    }
  }

  editTask(task: Task): void {
    this.selectedTask = task;
  }

  saveTask(task: Task): void {
    // Save task logic (if needed)
    this.selectedTask = null; // Close popup
  }

  cancelEditTask(): void {
    this.selectedTask = null; // Close popup without saving
  }

  
  closeList() {
    this.closeListEvent.emit();
  }

  addTask(list: TaskList) {
    const taskName = prompt('Enter task name:');
    if (taskName) {
      list.tasks.push({
        title: taskName,
        description: ''
      });
    }
  }

  addList(section: TaskSection) {
    const listName = prompt('Enter list name:');
    if (listName) {
      section.taskLists.push({ title: listName, tasks: [] });
    }
  }

  toggleSection(section: TaskSection) {
    section.collapsed = !section.collapsed;
  }

  onTaskDragStart(event: DragEvent, task: Task, list: TaskList) {
    this.draggingTask = task;
    this.draggingList = list;
  }

  // Method to handle drop on a task
  onTaskDrop(event: DragEvent, targetList: TaskList) {
    event.preventDefault();
    if (this.draggingTask && this.draggingList) {
      // Kiểm tra nếu đang thả vào cùng một danh sách
      if (this.draggingList !== targetList || this.draggingList === targetList) {
        // Di chuyển task vào danh sách đích
        targetList.tasks.push(this.draggingTask);
  
        // Xóa task từ danh sách nguồn nếu khác
        if (this.draggingList !== targetList) {
          const index = this.draggingList.tasks.indexOf(this.draggingTask);
          if (index !== -1) {
            this.draggingList.tasks.splice(index, 1);
          }
        }
      }
    }
    this.resetDragState();
  }
  

  // Method to handle drag start on a list
  onListDragStart(event: DragEvent, list: TaskList) {
    this.draggingList = list;
  }

  // Method to handle drop on a list
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

  // Method to handle drag over on a task
  onTaskDragOver(event: DragEvent) {
    event.preventDefault();
    const targetElement = event.target as HTMLElement;
    if (targetElement.classList.contains('task-card')) {
      targetElement.classList.add('drag-over');
    }
  }

  // Method to handle drag leave on a task
  onTaskDragLeave(event: DragEvent) {
    const targetElement = event.target as HTMLElement;
    if (targetElement.classList.contains('task-card')) {
      targetElement.classList.remove('drag-over');
    }
  }

  // Method to handle drag over on a list
  onListDragOver(event: DragEvent) {
    event.preventDefault();
    const targetElement = event.target as HTMLElement;
    if (targetElement.classList.contains('task-list-container')) {
      targetElement.classList.add('drag-over');
    }
  }

  // Method to handle drag leave on a list
  onListDragLeave(event: DragEvent) {
    const targetElement = event.target as HTMLElement;
    if (targetElement.classList.contains('task-list-container')) {
      targetElement.classList.remove('drag-over');
    }
  }

  // Method to reset drag state
  resetDragState() {
    this.draggingTask = null;
    this.draggingList = null;
  }

  // Method to find section containing a list
  findSectionContainingList(list: TaskList): TaskSection | null {
    for (const section of this.taskSections) {
      if (section.taskLists.includes(list)) {
        return section;
      }
    }
    return null;
  }
}
