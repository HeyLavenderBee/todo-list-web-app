import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { NotFound } from './components/not-found/not-found';
import { UserRegisterScreen } from './components/user-register-screen/user-register-screen';
import { UserLoginScreen } from './components/user-login-screen/user-login-screen';

export const routes: Routes = [
    {
        path: "",
        component: Home
    },
    {
        path: "register",
        component: UserRegisterScreen
    },
    {
        path: "login",
        component: UserLoginScreen
    },
    {
        path: "**",
        component: NotFound
    }
];
