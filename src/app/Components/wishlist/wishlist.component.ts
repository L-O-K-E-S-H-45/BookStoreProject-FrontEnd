import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../Services/wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  wishList: any;

  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.FetchUserWhishlists();
  }

  FetchUserWhishlists() {
    this.wishlistService.GetAllUserWishlists().subscribe((response: any) => {
      console.log(response);
      this.wishList = response.data;
    })
  }

  onDeleteWishlist(wishlist: any) {
    this.wishlistService.DeleteWishlist(wishlist).subscribe((response: any) => {
      console.log(response);
      this.FetchUserWhishlists();
    })
  }

}
