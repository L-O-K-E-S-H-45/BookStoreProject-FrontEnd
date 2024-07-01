import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user/user.service';
import { Router } from '@angular/router';
import { UserSharedService } from '../shared/userShared/user-shared.service';
import { AddressService } from '../../Services/address/address.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  user: any = {};
  isUserEditing: boolean = false;
  isAddressEditing: boolean = false;
  addressList: any;
  isNewAddress: boolean = false;
  newAddress: any = {
    fullName: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    type: ''
  };

  constructor(private userService: UserService, private router: Router, private userSharedService: UserSharedService,
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    // 1st way for getting data from home-component
    this.userService.currentUser.subscribe((user: any) => {
      console.log(user);
      this.user = user;
      // --- Both above & below line code works fine
      // if (user && Object.keys(user).length > 0) { // Check if user data is available
      //   this.user = user;
      // }
    })

    // 2nd way for getting data from home-component
    // this.userSharedService.currentUser.subscribe((response: any) => {
    //   console.log(response);
    //   this.user = response.data;
    // })

    this.fetchUserAddresses();

  }

  fetchUserAddresses() {
    this.addressService.FetchUserAddresses().subscribe((response: any) => {
      console.log(response);
      this.addressList = response.data;
      this.addressList.forEach((address: any) => address.isAddressEditing = false);
    })
  }

  onUpdateUser(user: any) {
    this.userService.UpdateUser(user).subscribe((response: any) => {
      console.log(response);
      this.user = response.data;
      this.isUserEditing = false;
    })
  }

  newForm() {
    this.isNewAddress = true;
  }

  onCancel() {
    this.isNewAddress = false;
  }

  onSaveAddress(newAddress: any) {
    newAddress.fullName = this.user.fullName;
    newAddress.mobile = this.user.mobile;
    this.addressService.AddAddress(newAddress).subscribe((response: any) => {
      console.log(response);
      this.newAddress = {
        fullName: '',
        mobile: '',
        address: '',
        city: '',
        state: '',
        type: ''
      };
      this.isNewAddress = false;
      this.fetchUserAddresses();
    });
  }

  onUpdateAddress(address: any) {
    if (address.isAddressEditing) {
      this.addressService.UpdateAddress(address).subscribe((response: any) => {
        console.log(response);
        this.isAddressEditing = false;
        this.fetchUserAddresses();
      });
    } else {
      address.isAddressEditing = true;
    }
  }

  onDeleteAddress(address: any) {
    this.addressService.DeleteAddress(address).subscribe((response: any) => {
      console.log(response);
      this.fetchUserAddresses();
    });
  }



}
