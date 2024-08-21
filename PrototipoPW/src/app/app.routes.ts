import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {
        path:'',
        component: LoginComponent
    },
    {
        path:'home',
        component: HomeComponent
    },
    {
        path:'about',
        component: AboutusComponent
    },
    {
        path:'admin',
        component: AdminComponent
        ,
        canActivate:[authGuard]
    },
    {
        path:'register',
        component: RegisterComponent
    }
];
