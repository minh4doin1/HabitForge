import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  login(formData: any) {
    return this.http.post<any>('http://localhost:5000/api/login', formData)
      .pipe(
        catchError(error => {
          console.error('HTTP error occurred:', error);
          let errorMessage = 'Unknown error occurred. Please try again later.';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          return throwError(errorMessage); // Rethrow the error for further handling
        })
      );
  }

  logout() {
    // Đặt logic để xử lý đăng xuất, ví dụ xóa token, đánh dấu isLoggedIn là false, v.v.
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    // Kiểm tra và trả về trạng thái đăng nhập
    return this.isLoggedIn;
  }

  setLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }
}
