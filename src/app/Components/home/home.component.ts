import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  value: string = '';
  isFocused: boolean = false;

  @ViewChild('searchInput') searchInput!: ElementRef;

  // @Output() updateRefreshEvent = new EventEmitter<string>();

  constructor(private route: Router) { }

  ngOnInit(): void {

  }

  onFocus() {
    this.isFocused = true;
    // this code is for search button
    this.searchInput.nativeElement.focus();
  }

  onBlur() {
    this.isFocused = false;
  }

  clearValue() {
    this.value = '';
  }

  archiveNotes() {
    this.route.navigateByUrl('/home/archives');
  }

  homePage() {
    this.route.navigateByUrl('/home/notes')
  }

  search(event: any) {
    console.log(event.target.value);
    // this.dataService.outgoingData(event.target.value);
  }

  //----------
  goToCart() {
    this.route.navigateByUrl('/bookstore/carts');
  }

}
