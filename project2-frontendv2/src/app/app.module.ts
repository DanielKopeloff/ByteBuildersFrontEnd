import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ProductService} from './services/product.service';
import {ByteUserService} from './services/byte-user.service';
import { ByteUserListComponent } from './components/byte-user-list/byte-user-list.component';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent
} from '@okta/okta-angular';

import myAppConfig from './config/my-app-config';

import {Router, Routes} from '@angular/router';

const oktaConfig = Object.assign({
  onAuthRequired: (injector) => {
    const router = injector.get(Router);

    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

const routes: Routes = [
// tslint:disable-next-line:no-unused-expression
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ByteUserListComponent,
    LoginComponent,
    LoginStatusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OktaAuthModule
  ],
  providers: [
    ProductService,
    ByteUserService,
    {provide: OKTA_CONFIG, useValue: oktaConfig}
  ]
  // providers: [ProductService, {provide: OKTA_CONFIG, useValue: oktaConfig}],
  // bootstrap: [AppComponent]
})
export class AppModule { }
