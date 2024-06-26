import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-book',
  templateUrl: './get-book.component.html',
  styleUrl: './get-book.component.scss'
})
export class GetBookComponent implements OnInit {

  @Input() bookObject: any;

  ngOnInit(): void {

  }

}
