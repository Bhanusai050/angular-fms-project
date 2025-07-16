// src/app/services/api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { CustomerApiResponse } from './Dashboard/dashboard/customers/customers.component'; // Adjust path if needed

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

  deleteAnimal(animalId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/api/animals/delete/${animalId}`,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      tap(() => console.log('✅ Animal deleted:', animalId)),
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
  addCustomer(customerData: any): Observable<CustomerApiResponse> {
    return this.http.post<CustomerApiResponse>(
      `${this.baseUrl}/api/customers/add`,
      customerData,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  // ✅ GET CUSTOMERS - GET: /api/customers/all
  getCustomers(): Observable<CustomerApiResponse[]> {
    return this.http.get<CustomerApiResponse[]>(
      `${this.baseUrl}/api/customers/all`,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  // ✅ UPDATE CUSTOMER - PUT: /api/customers/update/{id}
  updateCustomer(id: number, customerData: any): Observable<CustomerApiResponse> {
    return this.http.put<CustomerApiResponse>(
      `${this.baseUrl}/api/customers/update/${id}`,
      customerData,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
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

  // ✅ DELETE FEED INVENTORY - DELETE: /api/feed-inventory/{id}
  deleteFeedInventory(feedId: number) {
    return this.http.delete(
      `${this.baseUrl}/api/feed-inventory/${feedId}`,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      tap(() => console.log('✅ Feed inventory deleted:', feedId)),
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

  // ✅ GET FEED INVENTORY - GET: /api/feed-inventory
  getFeedInventory() {
    return this.http.get<any[]>(
      `${this.baseUrl}/api/feed-inventory`,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  // ✅ ADD FEED INVENTORY - POST: /api/feed-inventory
  addFeedInventory(payload: any) {
    return this.http.post(
      `${this.baseUrl}/api/feed-inventory`,
      payload,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  // ✅ UPDATE FEED INVENTORY - PUT: /api/feed-inventory/{id}
  updateFeedInventory(feedId: number, payload: any) {
    return this.http.put(
      `${this.baseUrl}/api/feed-inventory/${feedId}`,
      payload,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  // 💾 GET remembered email
  get rememberedEmail(): string {
    return localStorage.getItem('remember_email') || '';
  }
<<<<<<< HEAD

  feedConsumption = [
    // ...your data here...
  ];
=======
  // ANIMAL BATCHES CRUD
  // GET: /api/animalbatches/get
  getAnimalBatches(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/api/animalbatch`, // Confirm your backend supports this GET route
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      tap(res => console.log('✅ Animal Batches fetched:', res)),
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

  // POST: /api/animalbatches/add
  addAnimalBatch(batchData: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/animalbatch`, // Correct POST route
      batchData,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      tap(res => console.log('✅ Animal Batch added:', res)),
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

  // PUT: /api/animalbatches/update/{id}
   updateAnimalBatch(id: number, batchData: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/api/animalbatch/${id}`, // Correct PUT route
      batchData,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      tap(res => console.log('✅ Animal Batch updated:', res)),
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

  // DELETE: /api/animalbatches/delete/{id}
   deleteAnimalBatch(id: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/api/animalbatch/${id}`, // Correct DELETE route
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      tap(() => console.log('✅ Animal Batch deleted:', id)),
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


  // GET: /api/vendor/all
  getVendors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/vendor/all`, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  // POST: /api/vendor/add
  addVendor(vendorData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/vendor/add`, vendorData, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  // PUT: /api/vendor/update/{id}
  updateVendor(id: number, vendorData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/vendor/update/${id}`, vendorData, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  // DELETE: /api/vendor/delete/{id}
  deleteVendor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/vendor/delete/${id}`, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  // GET: /api/feedtypes/all
  getFeedTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/feedtypes/all`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // ORDER CRUD OPERATIONS
  // POST: /api/orders/add
  addOrder(orderData: any) {
    return this.http.post(`${this.baseUrl}/api/orders/add`, orderData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // GET: /api/orders/all
  getOrders() {
    return this.http.get<any[]>(`${this.baseUrl}/api/orders/get`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // PUT: /api/orders/update/{id}
  updateOrder(id: number, orderData: any) {
    return this.http.put(`${this.baseUrl}/api/orders/update/${id}`, orderData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // DELETE: /api/orders/delete/{id}
  deleteOrder(id: number) {
    return this.http.delete(`${this.baseUrl}/api/orders/delete/${id}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // EXPENSES CRUD OPERATIONS
  // POST: /api/expenses/add
  addExpense(expenseData: any) {
    return this.http.post(`${this.baseUrl}/api/expenses/add`, expenseData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // GET: /api/expenses/all
  getExpenses() {
    return this.http.get<any[]>(`${this.baseUrl}/api/expenses/getall`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // DELETE: /api/expenses/delete/{id}
  deleteExpense(id: number) {
    return this.http.delete(`${this.baseUrl}/api/expenses/delete/${id}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
>>>>>>> f9925068b714aab5fcc439a2d974ecfa99fe5895
}
