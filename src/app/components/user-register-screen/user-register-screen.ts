import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register-screen',
  imports: [],
  templateUrl: './user-register-screen.html',
  styleUrl: './user-register-screen.css',
})
export class UserRegisterScreen {
  constructor(private router: Router){}

  registerUser(){
    this.goToHome();
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

  goToHome(){
    this.router.navigate(['/']);
  }
}
