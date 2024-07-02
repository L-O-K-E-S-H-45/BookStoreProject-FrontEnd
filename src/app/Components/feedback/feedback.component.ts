

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FeedbackService } from '../../Services/feedback/feedback.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../../Services/order/order.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  @Input() bookId: any;
  @Input() feedbackList: any;
  @Output() feedbackAdded = new EventEmitter<any>();

  hasPurchased: boolean = false;
  rating: number = 0;
  feedbackText: string = '';
  userFeedback: any = null;
  userId: any;

  constructor(
    private feedbackService: FeedbackService,
    private snackbar: MatSnackBar,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId")
    this.checkIfUserPurchasedBook();
    // this.initializeFeedback();

  }

  setRating(rating: number) {
    this.rating = rating;
  }

  submitFeedback() {
    if (this.hasPurchased) {
      const newFeedback = {
        bookId: this.bookId,
        rating: this.rating,
        review: this.feedbackText
      };
      this.feedbackService.AddFeedbackToBook(newFeedback).subscribe((response: any) => {
        if (response.status === 'ok') {
          this.feedbackAdded.emit(newFeedback);
          this.rating = 0;
          this.feedbackText = '';
          // this.initializeFeedback();
        } else {
          this.snackbar.open('Feedback already given!!!', '', { duration: 3000 });
        }
      }, (error) => {
        this.snackbar.open('An error occurred while submitting feedback.', '', { duration: 3000 });
      });
    } else {
      this.snackbar.open('You have not purchased this book, so you are not allowed to give feedback.', '', { duration: 3000 });
    }
  }

  checkIfUserPurchasedBook() {
    this.orderService.FetchUserOrders().subscribe((response: any) => {
      response.data.forEach((book: any) => {
        if (book.bookId == this.bookId) {
          this.hasPurchased = true;
        }
      });
    });
  }

  // initializeFeedback() {
  //   if (this.feedbackList) {
  //     this.userFeedback = this.feedbackList.filter((feedback: any) => feedback.userId === this.userId);
  //     this.feedbackList = this.feedbackList.filter((feedback: any) => feedback.userId !== this.userId);
  //   }
  //   console.log(this.userId)
  //   console.log(this.userFeedback)
  // }

  editFeedback() {
    // logic to edit feedback
  }

  deleteFeedback() {
    // logic to delete feedback
  }
}



