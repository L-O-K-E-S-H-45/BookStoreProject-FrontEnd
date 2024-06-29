
//------------------------

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AddressService } from '../../Services/address/address.service';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit {
  newAddress: any = {
    fullName: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    type: ''
  };
  addressExist: boolean = false;
  showForm: boolean = false;
  @Input() addressList: any;
  @Output() addressAdded = new EventEmitter<any>();
  @Output() addressSelected = new EventEmitter<any>();

  constructor(private addressService: AddressService) { }

  ngOnInit(): void {
    this.addressExist = (this.addressList && this.addressList.length > 0) ? true : false;
    if (this.addressExist) {
      this.addressList.forEach((address: any) => address.isEditing = false);
    }
  }

  onContinue() {
    this.addressService.AddAddress(this.newAddress).subscribe((response: any) => {
      console.log(response);
      this.addressAdded.emit(response.data);
      this.newAddress = {
        fullName: '',
        mobile: '',
        address: '',
        city: '',
        state: '',
        type: ''
      };
      this.showForm = false;
    });
  }

  showAddAddressForm() {
    this.showForm = true;
  }

  onCancel() {
    this.showForm = false;
  }

  editAddress(address: any) {
    if (address.isEditing) {
      this.addressService.UpdateAddress(address).subscribe((response: any) => {
        console.log(response);
        address.isEditing = false;
        this.addressAdded.emit(response.data);
      });
    } else {
      address.isEditing = true;
    }
  }

  selectAddress(address: any) {
    this.addressSelected.emit(address);
  }
}



//----------------------



