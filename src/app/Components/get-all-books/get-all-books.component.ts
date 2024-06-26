import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-get-all-books',
  templateUrl: './get-all-books.component.html',
  styleUrl: './get-all-books.component.scss'
})
export class GetAllBooksComponent implements OnInit {

  booksCount: number = 0;

  @Input() booksList: any[] = [];

  ngOnInit(): void {
    this.updateBooksCount();
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
      case 'relevance':
      default:
        this.booksList.sort((a, b) => a.bookId - b.bookId);
        break;
    }
  }


}
