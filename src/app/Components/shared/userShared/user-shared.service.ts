import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSharedService {

  constructor() { }

  private userSource = new BehaviorSubject<any>(null);
  currentUser = this.userSource.asObservable();

  changeUser(user: any) {
    this.userSource.next(user);
  }

}
