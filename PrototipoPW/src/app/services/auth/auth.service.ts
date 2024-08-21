import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,  map, Observable, of, tap } from 'rxjs';

import { Router } from '@angular/router';
import { AuthResponse } from '../../models/auth/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7283/api/auth';
  private refreshTokenTimeout : any;
  private currentUserSubject: BehaviorSubject<string | null>;
  public currentUser: Observable<string | null>;
  constructor(private http: HttpClient, private router : Router) {
    const storedUser = localStorage.getItem('logedUser');
    this.currentUserSubject = new BehaviorSubject<string | null>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  public get currentUserValue(): string | null {
    return this.currentUserSubject.value;
  }


  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response =>{
        if (response.accessToken && response.refreshToken) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('logedUser', email);
          this.currentUserSubject.next(email);
          this.startRefreshTokenTimer();
        } else {
          console.error('Invalid login response');
        }
      })
    )
  }

  logout():void{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("logedUser");
    this.stopRefreshTokenTimer()
    this.router.navigate(['/'])
  }
  refreshToken(): Observable<AuthResponse> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken || !refreshToken) {
      console.error('Access token or refresh token is null');
      return of(); // Devuelve un observable vacío
    }
  
    const tokenModel = {
      accessToken,
      refreshToken
    };
  
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, tokenModel).pipe(
      map((response: AuthResponse) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        this.startRefreshTokenTimer();
        return response;
      })
    );
  }

  startRefreshTokenTimer() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('Access token is null');
      return;
    }
  
    const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (6 * 1000);
    
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  
}