import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-habit-farm',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './habit-farm.component.html',
  styleUrl: './habit-farm.component.css'
})
export class HabitFarmComponent {
addHabit() {
throw new Error('Method not implemented.');
}
togglePopup() {
throw new Error('Method not implemented.');
}
plots: any;
showPopup: any;
newHabit: any;
dragStart($event: DragEvent) {
throw new Error('Method not implemented.');
}
allowDrop($event: DragEvent) {
throw new Error('Method not implemented.');
}
drop($event: DragEvent) {
throw new Error('Method not implemented.');
}

}
