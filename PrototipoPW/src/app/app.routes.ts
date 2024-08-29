import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductComponent } from './pages/product/product.component';
import { CategoriesComponent } from './pages/categories/categories.component';

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
    },
    {
        path:'productList',
        component: ProductsListComponent
    },
    {   path: 'product/:id', 
        component: ProductComponent 
    }
    ,
    {   path: 'category/:id', 
        component: CategoriesComponent 
    }
];
