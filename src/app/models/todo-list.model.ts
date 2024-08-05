// task-list.model.ts
export interface TaskList {
    _id: string; // ID của TaskList
    title: string; // Tiêu đề của TaskList
    tasks: Task[]; // Mảng các tasks trong TaskList
  }
  
  export interface Task {
    _id: string; // ID của Task
    title: string; // Tiêu đề của Task
    description?: string; // Mô tả của Task (tùy chọn)
  }
  export interface TaskSection {
    _id: string;
    title: string;
    taskLists: TaskList[];
    highPriorityTasks: Task[];
    allTasks: Task[];
    completedTasks: Task[];
    collapsed: boolean;
  }
  