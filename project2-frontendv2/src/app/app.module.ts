import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ProductService} from './services/product.service';
import {ByteUserService} from './services/byte-user.service';
import { ByteUserListComponent } from './components/byte-user-list/byte-user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ByteUserListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ProductService,
    ByteUserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
