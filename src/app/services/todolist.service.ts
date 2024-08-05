import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task,TaskList,TaskSection } from '../models/todo-list.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  

  private apiUrl = 'http://localhost:5000/api'; // Cập nhật với URL API thực tế của bạn

  constructor(private http: HttpClient) { }

  // TaskList APIs
  getTaskSections(): Observable<TaskSection[]> {
    return this.http.get<TaskSection[]>(`${this.apiUrl}/task-sections`);
  }
  createTaskList(listName: string): Observable<TaskList> {
    return this.http.post<TaskList>(`${this.apiUrl}/task-lists`, { listName });
  }
  updateTaskList(taskListId: string, title: string): Observable<TaskList> {
    return this.http.put<TaskList>(`${this.apiUrl}/task-lists/${taskListId}`, { title });
  }

  deleteTaskList(taskListId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/task-lists/${taskListId}`);
  }

  // Task APIs
  createTask(listId: string, title: string, description: string): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks/${listId}`, { title, description });
  }

  updateTask(taskId: string, title: string, description: string): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${taskId}`, { title, description });
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/tasks/${taskId}`);
  }
}
