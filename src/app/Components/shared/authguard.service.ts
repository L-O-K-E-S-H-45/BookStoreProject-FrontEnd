import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor() { }

  LoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}
