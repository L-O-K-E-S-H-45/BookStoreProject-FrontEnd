import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  token: any;
  constructor(private httpService: HttpService) {
    this.token = localStorage.getItem("token");
  }

  public orderSource = new BehaviorSubject<any>({});
  inComingBooksList = this.orderSource.asObservable();

  outgoingBookList(books: any) {
    this.orderSource.next(books);
  }

  PlaceOrder(reqData: any) {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.postResetService('https://localhost:44321/api/Order/placeorder?cartId=' + reqData.cartId + '&addressId=' + reqData.addressId, {}, true, header);
  }

  FetchUserOrders() {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.getService('https://localhost:44321/api/Order/ordersByUser', true, header);
  }

  CancelOrder(reqData: any) {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.deleteService('https://localhost:44321/api/Order/cancelorder/' + reqData.orderId, true, header);
  }

  getOrdersList() {
    return this.orderSource.asObservable();
  }

  setOrdersList(orders: any) {
    this.orderSource.next(orders);
  }

}


