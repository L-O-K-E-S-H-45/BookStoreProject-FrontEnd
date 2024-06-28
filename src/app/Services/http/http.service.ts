import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  postService(reqUrl: string, payload: any, token: boolean = false, httpOptions: any = {}) {
    return this.httpClient.post(reqUrl, payload, token && httpOptions);
  }

  postResetService(reqUrl: string, payload: any, token: boolean = true, httpOptions: any = {}) {
    return this.httpClient.post(reqUrl, payload, token && httpOptions);
  }

  getService(reqUrl: string, token: boolean = true, httpOptions: any = {}) {
    return this.httpClient.get(reqUrl, token && httpOptions);
  }

  putService(reqUrl: string, payload: any, token: boolean = true, httpOptions: any = {}) {
    return this.httpClient.put(reqUrl, payload, token && httpOptions);
  }

  deleteService(reqUrl: string, token: boolean = true, httpOptions: any = {}) {
    return this.httpClient.delete(reqUrl, token && httpOptions);
  }


}
