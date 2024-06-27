import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-book',
  templateUrl: './display-book.component.html',
  styleUrl: './display-book.component.scss'
})
export class DisplayBookComponent implements OnInit {

  @Input() bookObj: any;

  ngOnInit(): void {

  }


}
