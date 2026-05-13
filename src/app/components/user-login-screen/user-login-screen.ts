import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-screen',
  imports: [FormsModule],
  templateUrl: './user-login-screen.html',
  styleUrl: './user-login-screen.css',
})
export class UserLoginScreen {
  private router = inject(Router);

  userName: string = "";
  email: string = "";
  password: string = "";

  goToRegister(){
    this.router.navigate(['/register']);
  }

  login(){
    try{
      if(this.userName.length <= 0){
        throw new Error("Name is needed");
      }
      if(this.email.length <= 0){
        throw new Error("Email is needed");
      }
      if(this.password.length < 6){
        throw new Error("Password needs to be at least 6 characters");
      }
      this.goToHome();
    } catch(e){
      alert(e);
    }
  }

  goToHome(){
    this.router.navigate(['/'], {
      queryParams: {userName: this.userName},
    });
  }
}
