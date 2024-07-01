import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: any;
  constructor(private httpService: HttpService) {
    this.token = localStorage.getItem("token");
  }

  // private userSource = new BehaviorSubject<any>(null);
  private userSource = new BehaviorSubject<any>({});
  currentUser = this.userSource.asObservable();

  changeUser(user: any) {
    this.userSource.next(user);
  }

  Login(reqData: any) {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      })
    }
    return this.httpService.postService('https://localhost:44321/api/User/login', reqData, false, header);
  }

  Register(reqData: any) {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      })
    }
    return this.httpService.postService('https://localhost:44321/api/User/register', reqData, false, header);
  }

  GetUserById() {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.getService('https://localhost:44321/api/User/getUserById', true, header);
  }

  // if i writ ethis method then in home.ts file i dont' need to set response.data into userService.userService(response.data)
  getUserById(): Observable<any> {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.getService('https://localhost:44321/api/User/getUserById', true, header)
      .pipe(
        map((response: any) => {
          this.changeUser(response.data);
          return response.data;
        })
      );
  }

  UpdateUser(reqData: any) {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.putService('https://localhost:44321/api/User/update', reqData, true, header);
  }


}
