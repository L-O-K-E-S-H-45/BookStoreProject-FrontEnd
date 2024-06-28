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
  bookCount: any;
  ifPlaceOrderClicked: boolean = false;

  constructor(private cartService: CartService, private router: Router) {
  }

  ngOnInit(): void {
    this.onGetAllUserCarts();
  }

  ifCartList() {
    return this.cartList ? true : false;
  }

  onGetAllUserCarts() {
    this.cartService.GetUserCarts().subscribe((response: any) => {
      console.log(response);
      this.cartList = response.data;
    })
  }

  // updateCartCount() {
  //   return this.cartList ? true : false;
  // }

  increaseBookCount(cart: any) {
    if (cart.quantity < 5) {
      cart.quantity = cart.quantity + 1;
      console.log(cart)
      this.onUpdateCart(cart);
    }
  }

  reduceBookCount(cart: any) {
    if (cart.quantity > 1) {
      cart.quantity--;
      this.onUpdateCart(cart);
    }
  }

  onRemoveCart(cart: any) {
    let data = {
      cartId: cart.cartId
    }
    this.cartService.RemoveBookFromCart(data).subscribe((response: any) => {
      console.log(response);
      this.onGetAllUserCarts();
    })
  }

  onUpdateCart(cart: any) {
    let data = {
      cartId: cart.cartId,
      quantity: cart.quantity
    }
    this.cartService.UpdateCart(data).subscribe((response: any) => {
      console.log(response);
      this.onGetAllUserCarts();
    })
  }

  onPlaceOrder(cart: any) {

  }

}



