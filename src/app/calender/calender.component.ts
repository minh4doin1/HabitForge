import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css'
})
export class CalenderComponent {
@Output() closeCalEvent = new EventEmitter<void>();
closeCal() {
this.closeCalEvent.emit();
}

}

