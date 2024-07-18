import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';

interface Plot {
imageUrl: 'assets/plot.png';
  id: number;
  habit: any | null;
  timeLeft?: string; // Thêm thuộc tính này để hiển thị thời gian còn lại
  isPlanting: boolean; // Thêm thuộc tính này để kiểm tra xem plot có đang được trồng cây không
}
@Component({
  selector: 'app-habit-farm',
  standalone: true,
  imports: [CommonModule,FormsModule, NzDrawerModule, NzFormModule, NzSelectModule,ReactiveFormsModule],
  templateUrl: './habit-farm.component.html',
  styleUrl: './habit-farm.component.css'
})

export class HabitFarmComponent {
  plots: Plot[] = [];
  newHabitForm: FormGroup;
  habits: any[] = [];
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
      { value: 'icon7', url: 'assets/plant1.png' },
      { value: 'icon8', url: 'assets/plant2.jpg' },
      { value: 'icon9', url: 'assets/plant1.png' },
      { value: 'icon10', url: 'assets/plant2.jpg' },
      { value: 'icon11', url: 'assets/plant1.png' },
      { value: 'icon12', url: 'assets/plant2.jpg' },
      { value: 'icon13', url: 'assets/plant1.png' },
      { value: 'icon14', url: 'assets/plant2.jpg' },
      { value: 'icon15', url: 'assets/plant1.png' },
      { value: 'icon16', url: 'assets/plant2.jpg' },
      { value: 'icon17', url: 'assets/plant1.png' },
      { value: 'icon18', url: 'assets/plant2.jpg' },
      { value: 'icon19', url: 'assets/plant1.png' },
      { value: 'icon20', url: 'assets/plant2.jpg' },
      { value: 'icon21', url: 'assets/plant1.png' },
      { value: 'icon22', url: 'assets/plant2.jpg' },
      { value: 'icon23', url: 'assets/plant1.png' },
      { value: 'icon24', url: 'assets/plant2.jpg' },
      // Add more icon options as needed
  ];
  isValidTime = false;

  togglePopup() {
      this.showPopup = !this.showPopup;
  }
  selectIcon(iconValue: string) {
    this.newHabit.icon = iconValue; // Gán giá trị icon được chọn vào newHabit.icon
    this.newHabitForm.patchValue({ icon: iconValue });
  }
  cancelAdd() {
      this.showPopup = false;
  }
  addHabit() {
    // Kiểm tra hợp lệ của form trước khi thêm habit
    if (this.newHabit.name && this.newHabit.hours !== null && this.newHabit.hours >= 0 && (this.newHabit.minutes === null || this.newHabit.minutes >= 1)) {
        // Tìm URL của icon dựa trên giá trị icon đã chọn
        const selectedIcon = this.iconOptions.find(icon => icon.value === this.newHabit.icon);
        const iconUrl = selectedIcon ? selectedIcon.url : '';

        // Thêm habit vào mảng habits
        this.habits.push({
            name: this.newHabit.name,
            hours: this.newHabit.hours,
            minutes: this.newHabit.minutes,
            iconUrl: iconUrl // Gán iconUrl cho habit mới
        });

        // Đặt lại newHabit để chuẩn bị cho habit tiếp theo
        this.newHabit = {
            name: '',
            hours: null,
            minutes: null,
            icon: ''
        };

        // Đóng popup sau khi thêm habit thành công
        this.showPopup = false;
        console.log(this.habits);
    }
}
getIconUrl(iconValue: string): string {
  const selectedIcon = this.iconOptions.find(icon => icon.value === iconValue);
  return selectedIcon ? selectedIcon.url : '';
}
  validateTimeFields() {
    if (this.newHabit.hours !== null && this.newHabit.hours >= 0 && (this.newHabit.minutes === null || this.newHabit.minutes >= 1)) {
        this.isValidTime = true;
    } else {
        this.isValidTime = false;
    }
}

draggedHabit: any;

onDragStart(event: DragEvent, habit: any) {
  this.draggedHabit = habit;
}

onDragOver(event: DragEvent) {
  event.preventDefault();
}

onDrop(event: DragEvent) {
  event.preventDefault();
  const index = this.habits.indexOf(this.draggedHabit);
  if (index > -1) {
    this.habits.splice(index, 1);
  }
}

onDragEnter(event: DragEvent) {
  event.preventDefault();
}

handleDragEnter(event: DragEvent) {
  event.preventDefault();
  event.dataTransfer!.dropEffect = 'move';
}
onDropHabit(event: DragEvent, plot: Plot) {
  event.preventDefault();
  
  // Kiểm tra xem plot đã có habit chưa và đang được trồng cây không
  if (plot.habit || plot.isPlanting) {
    return; // Nếu có rồi thì không làm gì cả
  }

  const habit = this.draggedHabit;
  plot.habit = habit;
  plot.isPlanting = true; // Đánh dấu là đang trồng cây

  // Tính toán và hiển thị thời gian đếm ngược
  this.startCountdown(plot);

  // Xóa habit khỏi danh sách habits nếu cần
  const index = this.habits.indexOf(habit);
  if (index > -1) {
    this.habits.splice(index, 1);
  }
}

startCountdown(plot: Plot) {
  const totalMinutes = plot.habit.hours * 60 + plot.habit.minutes;
  let remainingMinutes = totalMinutes;

  const countdownInterval = setInterval(() => {
    remainingMinutes--;

    if (remainingMinutes <= 0) {
      plot.timeLeft = 'Ready!';
      clearInterval(countdownInterval);
    } else {
      const hours = Math.floor(remainingMinutes / 60);
      const minutes = remainingMinutes % 60;
      plot.timeLeft = `${hours}h ${minutes}m`;
    }
  }, 60000); // Cập nhật mỗi phút (60000 milliseconds)
}

constructor(private formBuilder: FormBuilder) {
  // Khởi tạo FormGroup trong constructor
  this.newHabitForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      hours: [null, [Validators.required, Validators.min(0)]],
      minutes: [null, [Validators.required, Validators.min(0)]],
      icon: ['', Validators.required]
  });
  this.initPlots();
}
initPlots() {
  for (let i = 1; i <= 20; i++) {
    this.plots.push({ id: i, habit: null,isPlanting: false,imageUrl: 'assets/plot.png' });
  };
};
ngOnInit(): void {
  // Khởi tạo logic khác khi component được khởi tạo
}
}
