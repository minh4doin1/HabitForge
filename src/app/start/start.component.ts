import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router'
@Component({
  selector: 'app-start',
  standalone: true,
  imports:[ 
    FormsModule, // Import FormsModule if using template-driven forms
    ReactiveFormsModule,CommonModule ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {
  constructor(private router: Router) {}
  startGame() {
    console.log('Game started!');
    this.router.navigate(['/login']);
  }
}
