import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Purchase} from "../common/purchase";
import {Observable} from "rxjs";
import { BackEndAddress } from '../common/back-end-address';
import { Payment } from '../common/payment';
import { ByteOrder } from '../common/byte-order';
import { BackEndProductOrder } from '../common/back-end-product-order';
import { ProductOrder } from '../common/product-order';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = 'http://bytebuildersbackend-env.eba-s2pnimcq.us-east-2.elasticbeanstalk.com/api/checkout/purchase';
  private addAddressUrl = 'http://bytebuildersbackend-env.eba-s2pnimcq.us-east-2.elasticbeanstalk.com/api/address';
  private addPaymentUrl = 'http://bytebuildersbackend-env.eba-s2pnimcq.us-east-2.elasticbeanstalk.com/api/payment';
  private addByteOrderUrl = 'http://bytebuildersbackend-env.eba-s2pnimcq.us-east-2.elasticbeanstalk.com/api/byte-order';
  private addProductOrderUrl = 'http://bytebuildersbackend-env.eba-s2pnimcq.us-east-2.elasticbeanstalk.com/api/product-order';
  private productsURL = 'http://bytebuildersbackend-env.eba-s2pnimcq.us-east-2.elasticbeanstalk.com/api/product/';

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }

  addAddress(backEndAddress:BackEndAddress){
    return this.httpClient.post<BackEndAddress>(this.addAddressUrl , backEndAddress)
  }

  addPayment(payment:Payment){
    return this.httpClient.post<Payment>(this.addPaymentUrl , payment);
  }

  addByteOrder(byteOrder:ByteOrder){
    return this.httpClient.post<ByteOrder>(this.addByteOrderUrl , byteOrder);
  }

  addProductOrder(product:BackEndProductOrder){
    return this.httpClient.post<BackEndProductOrder>(this.addProductOrderUrl , product);
  }

 
  
  updateStock(prod : ProductOrder) {
    const searchUrl = `${this.productsURL}${prod.productId}`;
    let currProd : Product;
    this.httpClient.get<Product>(searchUrl).subscribe(data => {

      currProd = data;
      currProd.stock = currProd.stock - prod.quantity;
      
      // Maybe here we could display like an alert saying their order is completed 
      this.httpClient.put(searchUrl, currProd ).subscribe(data => console.log(data))


    })
  }

}
