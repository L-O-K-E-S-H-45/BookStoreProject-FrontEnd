import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterBook: any) {
    if (!Array.isArray(value) || !filterBook || typeof filterBook !== 'string') {
      return value;
    }

    const lowerCaseFilter = filterBook.toLowerCase();
    const books = [];
    for (const book of value) {
      if (book.title.toLowerCase().includes(lowerCaseFilter) || book.author.toLowerCase().includes(lowerCaseFilter)) {
        books.push(book);
      }
    }
    return books;
  }

}


