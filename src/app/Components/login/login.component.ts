import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../Services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  constructor(private formBulider: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBulider.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  hidePassword: boolean = true;

  toggleHidePassword(event: Event) {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }

  onLogin() {
    let data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.userService.Login(data).subscribe((response: any) => {
      console.log(response);
      localStorage.setItem("token", response.data);
      this.router.navigateByUrl('/bookstore/home')
    })
  }







}
