import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export function AuthGuard(router: Router): CanActivateFn {
  return () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      console.log(token);
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  };
}
