import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { flattenTreeData } from 'ng-zorro-antd/core/tree';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from '../todo-list/todo-list.component';
@Component({
  selector: 'app-questscape',
  standalone: true,
  imports: [CommonModule,TodoListComponent,CalendarComponent],
  templateUrl: './questscape.component.html',
  styleUrl: './questscape.component.css'
})
export class QuestscapeComponent {
isListOpen=false;
isCalOpen=false;
openCal() {
this.isCalOpen=true;
}

closeCal() {
  this.isCalOpen=false;
  }
openList() {
    this.isListOpen=true;
    }
closeList(){
  this.isListOpen=false;
}
}
