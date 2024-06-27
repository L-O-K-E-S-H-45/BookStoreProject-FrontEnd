import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cartList: any;
  bookCount: number = 1;
  constructor(private cartService: CartService, private router: Router) {

  }

  ngOnInit(): void {
    this.onGetAllUserCarts();
  }

  onGetAllUserCarts() {
    this.cartService.GetUserCarts().subscribe((response: any) => {
      console.log(response);
      this.cartList = response.data;
    })
  }

  updateCartCount() {
    return this.cartList ? true : false;
  }

  increaseBookCount(cart: any) {
    if (this.bookCount < 5)
      this.bookCount++;
  }

  reduceBookCount(cart: any) {
    if (this.bookCount > 1)
      this.bookCount--;
  }

  onRemoveCart(cart: any) {

  }

  onPlaceOrder(cart: any) {

  }

}
