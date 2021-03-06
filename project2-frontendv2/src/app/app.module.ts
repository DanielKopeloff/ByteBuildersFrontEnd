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
import {SearchComponent} from './components/search/search.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {CartComponent} from './components/cart/cart.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CartStatusComponent} from './components/cart-status/cart-status.component';

import { AddReviewComponent } from './components/add-review/add-review.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { UserReviewInfoComponent } from './components/user-review-info/user-review-info.component';
import { ReviewDetailsComponent } from './components/review-details/review-details.component';
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {ReactiveFormsModule} from "@angular/forms";

import { FormsModule} from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';
import { LoadingSpinnerComponent } from 'src/assets/loading-spinner/loading-spinner.component';
import { EditByteUserComponent } from './components/edit-byte-user/edit-byte-user.component';



const routes: Routes = [
  {path: 'checkout', component: CheckoutComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id/:name', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'cart', component: CartComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'edit', component: EditByteUserComponent},

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
  
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ByteUserListComponent,
    CategoryListComponent,
    SearchComponent,
    ProductDetailsComponent,
    SearchComponent,
    HomePageComponent,
    CartComponent,
    CartStatusComponent,
    AddReviewComponent,
    ReviewListComponent,
    UserReviewInfoComponent,
    ReviewDetailsComponent,
    CheckoutComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    EditByteUserComponent

  ],
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    ProductService,
    ByteUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
