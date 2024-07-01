import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthguardService } from './authguard.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate {
  constructor(private authService: AuthguardService, private router: Router) { }
  canActivate(): boolean {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/bookstore/login-signup');
    }
    return this.authService.LoggedIn();
  }

}
