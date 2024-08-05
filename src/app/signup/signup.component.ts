import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

signupForm!: FormGroup;
constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  private http: HttpClient
) { }
ngOnInit(): void {
  this.signupForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9_]*$/),
      Validators.minLength(5),
      Validators.maxLength(100)
    ]],
    password: ['', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]]
  });
}
submitForm(): void {
  if (this.signupForm.valid) {
    const formData = this.signupForm.value;
    this.http.post<any>('http://localhost:5000/api/signup', formData)
      .subscribe(
        response => {
          console.log('Signup successful:', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Signup error:', error);
          // Log full error response to inspect details
          console.log(error);
          // Optional: Handle error, display error message to user
        }
      );
  }
}

}


