import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../Services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  SignupForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.SignupForm = this.formBuilder.group({
      fullname: [''],
      email: [''],
      password: [''],
      mobile: ['']
    });
  }

  hidePassword: boolean = true;

  toggleHidePassword(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.hidePassword = !this.hidePassword
  }

  onSignup() {
    let data = {
      fullName: this.SignupForm.value.fullname,
      email: this.SignupForm.value.email,
      password: this.SignupForm.value.password,
      mobile: this.SignupForm.value.mobile
    }
    this.userService.Register(data).subscribe((response: any) => {
      console.log(response)
      this.router.navigateByUrl('/login');
    })
  }

}
