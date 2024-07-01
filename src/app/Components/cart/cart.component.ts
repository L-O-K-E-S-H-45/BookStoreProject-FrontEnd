import { Component, OnInit, signal } from '@angular/core';
import { CartService } from '../../Services/cart/cart.service';
import { Router } from '@angular/router';
import { AddressService } from '../../Services/address/address.service';
import { OrderService } from '../../Services/order/order.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'

})
export class CartComponent implements OnInit {

  cartList: any;
  bookCount: any;
  ifPlaceOrderClicked: boolean = false;
  selectedCart: any;
  // cart: any;
  selectedAddress: any;
  addressArray: any;
  constructor(private cartService: CartService, private router: Router,
    private addressService: AddressService, private orderService: OrderService) {
    // this.cart = localStorage.getItem("selectedCart");
    // this.cart = JSON.parse(this.cart)
  }

  ngOnInit(): void {
    this.onGetAllUserCarts();
    this.FetchUserAddresses();
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
    this.selectedCart = cart;
    this.ifPlaceOrderClicked = true;
    console.log(this.selectedCart)
    // localStorage.setItem("selectedCart", JSON.stringify(cart))
    // console.log(cart)
  }


  //-----------------------------

  step = signal(0);

  setStep(index: number) {
    this.step.set(index);
  }

  nextStep() {
    this.step.update(i => i + 1);
  }

  prevStep() {
    this.step.update(i => i - 1);
  }

  //--------------------------

  FetchUserAddresses() {
    this.addressService.FetchUserAddresses().subscribe((response: any) => {
      console.log(response);
      this.addressArray = response.data;
    })
  }

  onAddressAdded(newAddress: any) {
    this.selectedAddress = newAddress;
    console.log(this.selectedAddress)
    this.addressArray.push(newAddress);
    this.FetchUserAddresses();
  }

  onAddressSelected(selectedAddress: any) {
    // console.log('Selected Address:', selectedAddress);
    this.selectedAddress = selectedAddress;
    console.log(this.selectedAddress)
  }

  onCheckout(cart: any) {
    // this.selectedAddress = localStorage.getItem("selectedAddress");
    console.log(this.selectedAddress)
    if (this.selectedAddress) {
      // this.selectedAddress = JSON.parse(this.selectedAddress);
      let data = {
        cartId: this.selectedCart.cartId,
        addressId: this.selectedAddress.addressId
      }
      this.orderService.PlaceOrder(data).subscribe((response: any) => {
        console.log(response)
        // localStorage.removeItem("selectedAddress");
        this.router.navigateByUrl('/bookstore/ordersuccess')
      })
    }

  }

}



