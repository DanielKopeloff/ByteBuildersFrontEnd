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
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id/:name', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ByteUserListComponent,
    CategoryListComponent,
    SearchComponent
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
