import { Component, OnInit } from '@angular/core';
import { BookService } from '../../Services/book/book.service';

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrl: './books-container.component.scss'
})
export class BooksContainerComponent implements OnInit {

  booksArray: any;
  constructor(private booksService: BookService) { }

  ngOnInit(): void {
    this.onGetAllNotes();
  }

  onGetAllNotes() {
    this.booksService.GetAllBooks().subscribe((response: any) => {
      console.log(response);
      this.booksArray = response.data;
      this.booksArray = this.booksArray.filter((book: any) => book.isDeleted == false);
    })
  }

}
