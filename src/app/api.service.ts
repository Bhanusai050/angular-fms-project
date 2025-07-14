// src/app/services/api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface LoginResponse {
  token: string;
  username?: string; // Add username property for login response
  // Extend if your API response contains more fields
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // ADD ANIMAL BATCH - POST: /api/animal-batches
  addAnimalBatch(batchData: any) {
    return this.http.post(
      `${this.baseUrl}/api/animal-batches`,
      batchData,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      tap(res => console.log('✅ Animal batch added:', res)),
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

  // UPDATE ANIMAL BATCH - PUT: /api/animal-batches/{id}
  updateAnimalBatch(id: number, batchData: any) {
    return this.http.put(
      `${this.baseUrl}/api/animal-batches/${id}`,
      batchData,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      tap(res => console.log('✅ Animal batch updated:', res)),
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
  // ANIMAL BATCHES CRUD
  // GET: /api/animal-batches
  getAnimalBatches(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/api/animal-batches`,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      tap(res => console.log('✅ Animal batches fetched:', res)),
      catchError(err => {
        const msg = err.status === 0
          ? 'Network error – unable to reach the server.'
          : err.status >= 400 && err.status < 500
            ? 'Invalid request.'
            : 'Server error – please try again later.';
        return throwError(() => new Error(msg));
      })
    );
  }

  // DELETE: /api/animal-batches/{id}
  deleteAnimalBatch(id: number) {
    return this.http.delete(
      `${this.baseUrl}/api/animal-batches/${id}`,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      tap(() => console.log('✅ Animal batch deleted:', id)),
      catchError(err => {
        const msg = err.status === 0
          ? 'Network error – unable to reach the server.'
          : err.status >= 400 && err.status < 500
            ? 'Invalid request.'
            : 'Server error – please try again later.';
        return throwError(() => new Error(msg));
      })
    );
  }
  // ✅ ADD CUSTOMER - POST: /api/customers/add
  private baseUrl = 'https://localhost:44394'; // Your backend URL

  constructor(private http: HttpClient) {}

  // ✅ ADD ANIMAL - POST: /api/animals/add
  addAnimal(animalData: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/animals/add`, // ✅ Correct route
      animalData,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    ).pipe(
      tap(res => console.log('✅ Animal added:', res)),
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

  // ✅ CONTACT US - Submit contact form
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
      `${this.baseUrl}/register`, // Ensure this is the correct backend route
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

  // 🔐 LOGIN - Authenticate user
  login(email: string, password: string, remember: boolean): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/login`, // Ensure backend route matches
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
      `${this.baseUrl}/send-otp`, // Make sure your backend has this route
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

  // ✅ UPDATE ANIMAL - PUT: /api/animals/update/{id}
  updateAnimal(id: number, animalData: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/api/animals/update/${id}`,
      animalData,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    ).pipe(
      tap(res => console.log('✅ Animal updated:', res)),
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

  // ✅ GET ANIMALS - GET: /api/animals/get
  getAnimals(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/api/animals/get`,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    ).pipe(
      tap(res => console.log('✅ Animals fetched:', res)),
      catchError(err => {
        const msg = err.status === 0
          ? 'Network error – unable to reach the server.'
          : err.status >= 400 && err.status < 500
            ? 'Invalid request.'
            : 'Server error – please try again later.';
        return throwError(() => new Error(msg));
      })
    );
  }

  // ✅ ADD CUSTOMER - POST: /api/customers/add
  addCustomer(customerData: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/customers/add`,
      customerData,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      tap(res => console.log('✅ Customer added:', res)),
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

  // ✅ GET CUSTOMERS - GET: /api/customers/all
  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/api/customers/all`,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      tap(res => console.log('✅ Customers fetched:', res)),
      catchError(err => {
        const msg = err.status === 0
          ? 'Network error – unable to reach the server.'
          : err.status >= 400 && err.status < 500
            ? 'Invalid request.'
            : 'Server error – please try again later.';
        return throwError(() => new Error(msg));
      })
    );
  }

  // ✅ UPDATE CUSTOMER - PUT: /api/customers/update/{id}
  updateCustomer(id: number, customerData: any) {
    return this.http.put(
      `${this.baseUrl}/api/customers/update/${id}`,
      customerData,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      tap(res => console.log('✅ Customer updated:', res)),
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

  // ✅ DELETE CUSTOMER - DELETE: /api/customers/delete/{id}
  deleteCustomer(id: number) {
    return this.http.delete(
      `${this.baseUrl}/api/customers/delete/${id}`,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      tap(() => console.log('✅ Customer deleted:', id)),
      catchError(err => {
        const msg = err.status === 0
          ? 'Network error – unable to reach the server.'
          : err.status >= 400 && err.status < 500
            ? 'Invalid request.'
            : 'Server error – please try again later.';
        return throwError(() => new Error(msg));
      })
    );
  }

  // ✅ DELETE ANIMAL - DELETE: /api/animals/delete/{id}
  deleteAnimal(id: number) {
    return this.http.delete(
      `${this.baseUrl}/api/animals/delete/${id}`,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      tap(() => console.log('✅ Animal deleted:', id)),
      catchError(err => {
        const msg = err.status === 0
          ? 'Network error – unable to reach the server.'
          : err.status >= 400 && err.status < 500
            ? 'Invalid request.'
            : 'Server error – please try again later.';
        return throwError(() => new Error(msg));
      })
    );
  }

  // 💾 GET remembered email
  get rememberedEmail(): string {
    return localStorage.getItem('remember_email') || '';
  }
}
