import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  standalone:true,
  selector: 'app-login',
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  username: string = '';
  password: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
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
    if (this.loginForm.invalid) {
      return;
    }

    const formData = this.loginForm.value;

    this.http.post<any>('http://localhost:5000/api/login', formData)
      .pipe(
        catchError(error => {
          console.error('HTTP error occurred:', error);
          let errorMessage = 'Unknown error occurred. Please try again later.';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          this.errorMessage = errorMessage; // Display error message in the UI
          return throwError(errorMessage); // Rethrow the error for further handling
        })
      )
      .subscribe(
        response => {
          console.log('Login successful:', response);
          localStorage.setItem('token', response.token);
          this.authService.setLoggedIn(true); // Đánh dấu đăng nhập thành công
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Login error:', error);
          if (error.status === 401) {
            this.errorMessage = 'Invalid username or password.';
          } else {
            this.errorMessage = 'Error during login. Please try again later.';
          }
        }
      );
  }

  clearErrorMessage(): void {
    this.errorMessage = ''; // Clear error message
  }
  
}
