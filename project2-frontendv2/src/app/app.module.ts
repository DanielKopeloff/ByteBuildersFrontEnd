import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ProductService} from './services/product.service';
import {ByteUserService} from './services/byte-user.service';
import {ByteUserListComponent} from './components/byte-user-list/byte-user-list.component';
import {CategoryListComponent} from './components/category-list/category-list.component';
import {RouterModule, Routes} from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';


const routes: Routes = [
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'cart', component: CartComponent},
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '**', redirectTo: '/', pathMatch : 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ByteUserListComponent,
    CategoryListComponent,
    RegisterComponent,
    HomePageComponent,
    LoginComponent,
    CartComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ProductService,
    ByteUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
