import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

interface Task {
  title: string;
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
  imports:[CommonModule],
  standalone:true,
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  onListDragOver(event: DragEvent) {
    event.preventDefault();
    // You can add additional styling or logic here if needed
  }
onTaskDragOver(event: DragEvent) {
  event.preventDefault();
  // You can add additional styling or logic here if needed
}

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

  closeList() {
    this.closeListEvent.emit();
  }

  addTask(list: TaskList) {
    const taskName = prompt('Enter task name:');
    if (taskName) {
      list.tasks.push({ title: taskName });
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
  // Phương thức để bắt đầu kéo thả task
  dragStart(event: DragEvent, task: Task, list: TaskList) {
    this.draggingTask = task;
    this.draggingList = list;
  }

  // Phương thức xử lý khi task được kéo qua một list khác
  onTaskDrop(event: DragEvent, targetList: TaskList) {
    if (this.draggingTask && this.draggingList && this.draggingList !== targetList) {
      // Xóa task khỏi danh sách hiện tại
      this.draggingList.tasks = this.draggingList.tasks.filter(task => task !== this.draggingTask);
      // Thêm task vào danh sách mới
      targetList.tasks.push(this.draggingTask);
    }
    this.resetDragState();
  }

  // Phương thức để bắt đầu kéo thả list
  onListDragStart(event: DragEvent, list: TaskList) {
    this.draggingList = list;
  }

  // Phương thức xử lý khi list được kéo vào một section khác
  onListDrop(event: DragEvent, targetSection: TaskSection) {
    if (this.draggingList) {
      const sourceSection = this.findSectionContainingList(this.draggingList);
      if (sourceSection && sourceSection !== targetSection) {
        // Xác định index của list đang kéo trong section hiện tại
        const index = sourceSection.taskLists.indexOf(this.draggingList);
        if (index !== -1) {
          // Xóa list khỏi section hiện tại
          sourceSection.taskLists.splice(index, 1);
          // Thêm list vào section mới
          targetSection.taskLists.push(this.draggingList);
        }
      }
    }
    this.resetDragState();
  }

  // Phương thức đặt lại trạng thái khi kéo thả kết thúc
  resetDragState() {
    this.draggingTask = null;
    this.draggingList = null;
  }

  // Phương thức tìm section chứa một list cụ thể
  findSectionContainingList(list: TaskList): TaskSection | null {
    for (const section of this.taskSections) {
      if (section.taskLists.includes(list)) {
        return section;
      }
    }
    return null;
  }
}
