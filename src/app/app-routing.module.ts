import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { CommonComponent } from './Components/common/common.component';
import { SignupComponent } from './Components/signup/signup.component';
import { HomeComponent } from './Components/home/home.component';
import { BooksContainerComponent } from './Components/books-container/books-container.component';
import { GetBookComponent } from './Components/get-book/get-book.component';
import { CartComponent } from './Components/cart/cart.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { OrderSuccessComponent } from './Components/order-success/order-success.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { authGuard } from './Components/shared/auth.guard';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: 'bookstore', component: HomeComponent,
    children: [
      { path: '', redirectTo: '/bookstore/home', pathMatch: 'full' },
      { path: 'home', component: BooksContainerComponent },
      { path: 'home/getbook/:bookId', component: GetBookComponent },
      { path: 'user-profile', component: UserProfileComponent, canActivate: [authGuard] },
      { path: 'carts', component: CartComponent, canActivate: [authGuard] },
      { path: 'wishlists', component: WishlistComponent, canActivate: [authGuard] },
      { path: 'ordersuccess', component: OrderSuccessComponent, canActivate: [authGuard] },
      { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },
    ]
  },
  {
    path: 'bookstore/login-signup', component: CommonComponent,
    children: [
      { path: '', redirectTo: 'login-signup', pathMatch: 'full' },
      // { path: 'login', component: LoginComponent },
      // { path: 'signup', component: SignupComponent },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
