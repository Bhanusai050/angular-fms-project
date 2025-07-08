import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface LoginResponse {
  token: string;
  // Add more fields if needed
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:44394';  // ✅ Your actual API root (no /api or /Help)

  constructor(private http: HttpClient) {}

  // 📨 CONTACT US - Submit contact form
  submitContact(formData: { name: string; phoneNumber: string; email: string; message: string }): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/Postcontactmessages`,
      formData,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    ).pipe(
      tap(() => console.log('✅ Contact form submitted')),
      catchError(err => {
        const msg = err.status === 0
          ? 'Network error – unable to reach the server.'
          : err.status >= 400 && err.status < 500
            ? 'Invalid input – please check your data.'
            : 'Server error – please try again later.';
        return throwError(() => new Error(msg));
      })
    );
  }

  // ✅ SIGN UP - Register new user
  register(data: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/register`, // ✅ Corrected route
      data,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    ).pipe(
      tap(res => console.log('✅ Registered:', res)),
      catchError(err => {
        const msg = err.status === 0
          ? 'Network error – unable to reach server.'
          : err.status >= 400 && err.status < 500
            ? 'Invalid input – check form values.'
            : 'Server error – try again.';
        return throwError(() => new Error(msg));
      })
    );
  }

  // 🔐 LOGIN - Main login API
  login(email: string, password: string, remember: boolean): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/login`, // ✅ Correct route
      { email, password },
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    ).pipe(
      tap(res => {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem('auth_token', res.token);
        if (remember) {
          localStorage.setItem('remember_email', email);
        } else {
          localStorage.removeItem('remember_email');
        }
      }),
      catchError(err => {
        const message = err.status === 0
          ? 'Network error – unable to reach server.'
          : err.status >= 400 && err.status < 500
            ? 'Invalid login – check credentials.'
            : 'Server error – please try later.';
        return throwError(() => new Error(message));
      })
    );
  }

  // 📧 FORGOT PASSWORD - Send OTP
  sendOtp(email: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/send-otp`, // ✅ Correct route
      { email },
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    ).pipe(
      catchError(err => {
        const msg = err.status === 0
          ? 'Network error – unable to reach server.'
          : err.status >= 400 && err.status < 500
            ? 'Invalid request – check email.'
            : 'Server error – please try again.';
        return throwError(() => new Error(msg));
      })
    );
  }

  // 💾 GET remembered email
  get rememberedEmail(): string {
    return localStorage.getItem('remember_email') || '';
  }
}
