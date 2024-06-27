import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  token: any;
  constructor(private httpService: HttpService) {
    this.token = localStorage.getItem("token");
  }


  AddBookToCart(reqData: any) {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.postResetService('https://localhost:44321/api/Cart/addBookToCart', reqData, true, header);
  }

  GetUserCarts() {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.getService('https://localhost:44321/api/Cart/cartByUser', true, header);
  }

}
