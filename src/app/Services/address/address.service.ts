import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  token: any;
  constructor(private httpService: HttpService) {
    this.token = localStorage.getItem("token");
  }

  FetchUserAddresses() {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.getService('https://localhost:44321/api/Address/addressesByUser', true, header);
  }

  AddAddress(reqData: any) {
    // console.log(reqData)
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.postResetService('https://localhost:44321/api/Address/addAddress', reqData, true, header);
  }

  UpdateAddress(reqData: any) {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.putService('https://localhost:44321/api/Address/update?addressId=' + reqData.addressId, reqData, true, header);
  }

  DeleteAddress(reqData: any) {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.deleteService('https://localhost:44321/api/Address/delete?addressId=' + reqData.addressId, true, header);
  }

}
