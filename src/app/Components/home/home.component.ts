import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../Services/data/data.service';
import { UserService } from '../../Services/user/user.service';
import { UserSharedService } from '../shared/userShared/user-shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  value: string = '';
  isFocused: boolean = false;

  isLoggedIn: boolean = false;
  UserName: string = 'Profile';

  @ViewChild('searchInput') searchInput!: ElementRef;


  constructor(private route: Router, private dataService: DataService, private userService: UserService, private userSharedService: UserSharedService,) { }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if (token) {
      this.userService.GetUserById().subscribe((response: any) => {
        console.log(response);
        this.UserName = response.data.fullName;
        this.userService.changeUser(response.data);
        this.userSharedService.changeUser(response.data);
      })
      this.isLoggedIn = true;
    }
  }

  onLogout() {
    localStorage.removeItem("token");
    this.UserName = 'Profile';
    this.isLoggedIn = false;
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

  search(event: any) {
    console.log(event.target.value);
    this.dataService.outgoingData(event.target.value);
  }

  //----------
  goToCart() {
    if (this.isLoggedIn) {
      this.route.navigateByUrl('/bookstore/carts');
    }
    else this.goToLoginSignup();
  }

  goToLoginSignup() {
    this.route.navigateByUrl('/bookstore/login-signup');
  }
  goToProfile() {
    this.route.navigateByUrl('/bookstore/user-profile');
  }
  goToOrders() {
    this.route.navigateByUrl('/bookstore/orders');
  }

  goToWishlist() {
    this.route.navigateByUrl('/bookstore/wishlists');
  }

}
