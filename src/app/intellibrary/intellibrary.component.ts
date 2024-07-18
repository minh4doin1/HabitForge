import { Component } from '@angular/core';
import { LibDeskComponent } from "../lib-desk/lib-desk.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-intellibrary',
  standalone: true,
  imports: [LibDeskComponent,CommonModule],
  templateUrl: './intellibrary.component.html',
  styleUrl: './intellibrary.component.css'
})
export class IntellibraryComponent {
  isDeskOpen = false;

  openDesk() {
    this.isDeskOpen = true;
  }
  closeDesk() {
    this.isDeskOpen = false;
  }
}
