import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BookService } from '../../Services/book/book.service';
import { ActivatedRoute, NavigationEnd, Router, UrlSegment } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators'
import { CartService } from '../../Services/cart/cart.service';
import { error } from 'console';

@Component({
  selector: 'app-get-book',
  templateUrl: './get-book.component.html',
  styleUrl: './get-book.component.scss'
})
export class GetBookComponent implements OnInit, OnDestroy {

  // no use
  private routerSubscription!: Subscription; // Use the non-null assertion operator

  bookObject: any;
  bookId: any;

  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute,
    private router: Router, private cartService: CartService) {
    // 3rd way
    this.bookId = this.activatedRoute.snapshot.params['bookId'];
  }
  ngOnInit(): void {
    // 1st way-> getting bookId from local-storage
    this.onGetBookById();

    // ----not fetching
    // const navigation = this.router.getCurrentNavigation();
    // this.bookObject = navigation?.extras?.state?.['book'];
    //---- not fetching
    // this.route.paramMap.subscribe(params => {
    //   const navigation = this.router.getCurrentNavigation();
    //   if (navigation?.extras?.state) {
    //     this.bookObject = navigation.extras.state['book'];
    //     console.log('Book Object:', this.bookObject); // Debug: Check the book object
    //   } else {
    //     console.log('Navigation state is not available.');
    //   }
    // });

    //---- fetching but after refresh book data will be gone, so bookObject is stored in local-sorage
    // this.bookService.book$.subscribe(book => {
    //   if (book) {
    //     this.bookObject = book;
    //     console.log('Book Object:', this.bookObject); // Debug: Check the book object
    //   } else {
    //     console.log('Book state is not available.');
    //   }
    // });

    // 2nd way -> working, here book getting from local-storage
    // this.bookObject = this.bookService.getBookFromLocalStorage();
    // if (!this.bookObject) {
    //   this.bookService.book$.subscribe(book => {
    //     if (book) {
    //       this.bookObject = book;
    //       console.log('Book Object:', this.bookObject); // Debug: Check the book object
    //     } else {
    //       console.log('Book state is not available.');
    //     }
    //   });
    // }

    //---- fetching book from local-strage & clearing local-storage after moving away from 'getbook; page
    // not working
    // this.routerSubscription = this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd && event.url !== '/bookstore/home/getbook') {
    //     this.bookService.clearBookFromLocalStorage();
    //   }
    // });
    // not working
    // this.routerSubscription = this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd),
    // ).subscribe(() => {
    //   console.log('inside rotersub')
    //   const currentUrlSegments: UrlSegment[] = this.activatedRoute.snapshot.url;
    //   const currentUrl = '/' + currentUrlSegments.map(segment => segment.path).join('/');
    //   console.log('middle rotersub')
    //   if (currentUrl !== '/bookstore/home/getbook') {
    //     this.bookService.clearBookFromLocalStorage();
    //   }
    //   console.log('end rotersub')
    // });

  }

  // no use
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  onGetBookById() {
    console.log('get book')
    // 1st way
    // let bookId = localStorage.getItem("bookId") || "defaultBookId"
    // let bookId = localStorage.getItem("bookId");
    // if (!bookId) {console.error("BookId not found in localStorage");}
    // 3rd way
    if (!this.bookId) {
      console.error("BookId not fetched");
    }
    else {
      let data = {
        // bookId: localStorage.getItem("bookId")
        bookId: this.bookId
      }
      this.bookService.GetBookById(data).subscribe((response: any) => {
        console.log(response);
        this.bookObject = response.data;

        // if (response.status === 200) {
        //   console.log(response);
        // }
        // else {
        //   console.error(response.error);
        // }
        // }
        // ,
        //   error => {
        //     console.error('HTTP request failed:', error);
        //   }
        // );

      })
    }
  }

  addToCart() {
    let userId = localStorage.getItem("token");
    if (!userId) {
      this.router.navigateByUrl('/bookstore/login-signup')
      return;
    }
    let data = {
      bookId: this.bookObject.bookId
    }
    this.cartService.AddBookToCart(data).subscribe((response: any) => {
      console.log(response)
    });
  }

}
