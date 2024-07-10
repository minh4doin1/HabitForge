import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';


@Component({
  selector: 'app-habit-farm',
  standalone: true,
  imports: [CommonModule,FormsModule, NzDrawerModule, NzFormModule, NzSelectModule,ReactiveFormsModule],
  templateUrl: './habit-farm.component.html',
  styleUrl: './habit-farm.component.css'
})
export class HabitFarmComponent {
  newHabitForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    // Khởi tạo FormGroup trong constructor
    this.newHabitForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
        hours: [null, [Validators.required, Validators.min(0)]],
        minutes: [null, [Validators.required, Validators.min(1)]],
        icon: ['', Validators.required]
    });
    
}
selectHabit(arg0: string) {
throw new Error('Method not implemented.');
}
  showPopup = false;
  newHabit = {
      name: '',
      hours: null,
      minutes: null,
      icon: ''
  };
  iconOptions = [
      { value: 'icon1', url: 'assets/plant1.png' },
      { value: 'icon2', url: 'assets/plant2.jpg' },
      { value: 'icon3', url: 'assets/plant1.png' },
      { value: 'icon4', url: 'assets/plant2.jpg' },
      { value: 'icon5', url: 'assets/plant1.png' },
      { value: 'icon6', url: 'assets/plant2.jpg' },
      // Add more icon options as needed
  ];
  isValidTime = false;

  togglePopup() {
      this.showPopup = !this.showPopup;
  }
  selectIcon(iconValue: string) {
    this.newHabit.icon = iconValue; // Gán giá trị icon được chọn vào newHabit.icon
}
  cancelAdd() {
      this.showPopup = false;
  }

  addHabit() {
      // Logic to add habit
      this.showPopup = false;
  }

  validateTimeFields() {
    if (this.newHabit.hours !== null && this.newHabit.hours >= 0 && (this.newHabit.minutes === null || this.newHabit.minutes >= 1)) {
        this.isValidTime = true;
    } else {
        this.isValidTime = false;
    }
}
}