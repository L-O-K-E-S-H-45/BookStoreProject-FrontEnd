import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { CommonComponent } from './Components/common/common.component';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './Components/home/home.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { GetAllBooksComponent } from './Components/get-all-books/get-all-books.component';
import { BooksContainerComponent } from './Components/books-container/books-container.component';
import { GetBookComponent } from './Components/get-book/get-book.component';
import { CartComponent } from './Components/cart/cart.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { AddressDetailsComponent } from './Components/address-details/address-details.component';
import { OrderSuccessComponent } from './Components/order-success/order-success.component';

import { MatRadioModule, MatRadioButton } from '@angular/material/radio';
import { OrdersComponent } from './Components/orders/orders.component';

import { FilterPipe } from './pipes/filter.pipe';
import { AuthguardService } from './Components/shared/authguard.service';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CommonComponent,
    HomeComponent,
    GetAllBooksComponent,
    BooksContainerComponent,
    GetBookComponent,
    CartComponent,
    WishlistComponent,
    AddressDetailsComponent,
    OrderSuccessComponent,
    OrdersComponent,
    FilterPipe,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,

    HttpClientModule,

    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatDialogModule,
    MatRadioModule,
    MatRadioButton,


  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),

    AuthguardService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
