import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

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

  GetBookById(reqData: any) {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      })
    }
    return this.httpService.getService('https://localhost:44321/api/Book/getById?bookId=' + reqData.bookId, false, header);
  }

  // ----------
  // public bookSubject = new BehaviorSubject<any>(null);
  // book$ = this.bookSubject.asObservable();
  // setBook(book: any) {
  //   this.bookSubject.next(book);
  // }
  // -----------------


  // -----------
  // private bookSubject = new BehaviorSubject<any>(this.getBookFromLocalStorage());
  // book$ = this.bookSubject.asObservable();

  private bookSubject = new BehaviorSubject<any>(null);
  book$ = this.bookSubject.asObservable();

  setBook(book: any) {
    this.bookSubject.next(book);
  }

  saveBookToLocalStorage(book: any) {
    localStorage.setItem('selectedBook', JSON.stringify(book));
  }

  getBookFromLocalStorage(): any {
    const book = localStorage.getItem('selectedBook');
    return book ? JSON.parse(book) : null;
  }

  clearBookFromLocalStorage() {
    localStorage.removeItem('selectedBook');
  }

}
