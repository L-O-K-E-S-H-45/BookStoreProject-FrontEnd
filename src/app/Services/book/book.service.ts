import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpService: HttpService) { }

  GetAllBooks() {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      })
    }
    return this.httpService.getService('https://localhost:44321/api/Book/books', false, header);
  }

}
