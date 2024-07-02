import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order/order.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'

  ,
  providers: [DatePipe]

})
export class OrdersComponent implements OnInit {

  ordersList: any;
  constructor(private orderService: OrderService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.onGetAllOrders();
  }

  // Method to format the date
  getFormattedDate(date: any): any {
    return this.datePipe.transform(date, 'dd MMMM yyyy');
  }

  onGetAllOrders() {
    this.orderService.FetchUserOrders().subscribe((response: any) => {
      console.log(response);
      if (response.data.length > 0) {
        localStorage.setItem("userId", response.data[0].userId);
      }
      this.ordersList = response.data;
      this.orderService.outgoingBookList(response.data);
      this.orderService.setOrdersList(response.data);
      this.orderService.inComingBooksList.subscribe((res: any) => {
        console.log(res)
      })
    })
  }

  onCancelOrder(order: any) {
    this.orderService.CancelOrder(order).subscribe((response: any) => {
      console.log(response);
      this.onGetAllOrders();
    })
  }

}



