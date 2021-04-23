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

  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';
  private addAddressUrl = 'http://localhost:8080/api/address';
  private addPaymentUrl = 'http://localhost:8080/api/payment';
  private addByteOrderUrl = 'http://localhost:8080/api/byte-order';
  private addProductOrderUrl = 'http://localhost:8080/api/product-order';
  private productsURL = 'http://localhost:8080/api/product/';

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

  /**
   * Im a little torn on if to implement this because i want to keep the API calls down
   * But my thinking for this is I have to grab the stock of the product from the DB because if two users make an order of the the same product then those stock values will no longer be valid. So I would use this method of getting the stock from the DB in stead of the in session memory because that value might be stale 
   */
  updateStock(prod : ProductOrder) {
    console.log('Hitting the put')
    const searchUrl = `${this.productsURL}${prod.productId}`;
    let currProd : Product;
    console.log(searchUrl);
    this.httpClient.get<Product>(searchUrl).subscribe(data => {

      currProd = data;
      console.log(prod.quantity + JSON.stringify(currProd));
      let body =
      {'stock':currProd.stock-prod.quantity};
      this.httpClient.put(searchUrl, body ).subscribe(data => console.log(data))


    })
  }

}
