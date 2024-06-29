import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../Services/book/book.service';

@Component({
  selector: 'app-get-all-books',
  templateUrl: './get-all-books.component.html',
  styleUrl: './get-all-books.component.scss'
})
export class GetAllBooksComponent implements OnInit {

  booksCount: number = 0;
  getBook: any;
  @Input() booksList: any[] = [];
  constructor(private router: Router, private bookService: BookService) { }
  ngOnInit(): void {
    // 2nd way to update books count
    // this.updateBooksCount();
  }

  // 1st way to update books count
  bookList() {
    return this.booksList ? true : false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['booksList']) {
      this.updateBooksCount();
    }
  }
  private updateBooksCount(): void {
    this.booksCount = this.booksList ? this.booksList.length : 0;
  }

  onSortChange(event: any): void {
    const sortValue = event.target.value;
    switch (sortValue) {
      case 'priceLowToHigh':
        this.booksList.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        this.booksList.sort((a, b) => b.price - a.price);
        break;
      case 'newestArrivals':
        this.booksList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'alphabeticalOrder':
        this.booksList.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'relevance':
      default:
        this.booksList.sort((a, b) => a.bookId - b.bookId);
        break;
    }
  }


  goToGetBook(book: any) {
    console.log(book)
    // this.getBook = book;
    // console.log(this.getBook)
    // this.router.navigate(['/bookstore/home/getbook'], { state: { book } })
    // console.log({ state: { book } })

    // this.router.navigate(['/bookstore/home/getbook'], { state: { book } }).then(() => {
    //   console.log({ state: { book } });
    // });

    //---- working
    // this.bookService.setBook(book);
    // this.router.navigate(['/bookstore/home/getbook']);

    this.bookService.setBook(book);
    this.bookService.saveBookToLocalStorage(book);
    localStorage.setItem("bookId", book.bookId);
    this.router.navigate(['/bookstore/home/getbook', book.bookId]);
  }


}
