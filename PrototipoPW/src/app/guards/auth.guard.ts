import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const authGuard: CanActivateFn =  (route, state) => {
  
  const router = inject(Router);
  
  const token = localStorage.getItem('accessToken');
  if (token && !isTokenExpired(token)) {
    return true;
  } else {
     router.navigate(['/']);
    return false;
  }
};

const isTokenExpired = (token: string): boolean => {
  const jwtToken = JSON.parse(atob(token.split('.')[1]));
  const expiry = (jwtToken.exp * 1000) - Date.now();
  return expiry < 0;
};