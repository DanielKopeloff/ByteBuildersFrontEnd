import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Product} from '../common/product';
import {map} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import { CartItem } from '../common/cart-item';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  private baseUrl = "http://localhost:8080/api/product/search/cart";
  cartItems:CartItem[] = [];
  
  
  totalPrice : Subject<number> = new Subject<number>();
  
  totalQuantity : Subject<number> = new Subject<number>();

  constructor(private httpClient: HttpClient) { }

  getCart(userID : number):
  Observable<Product[]>{
    //const searchUrl = `${this.baseUrl}/?userId=${userID}`
    const searchUrl = `${this.baseUrl}/?userId=8`
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  /**
   * Check if we already have the item in the Cart
   * find the item in the cart based on item id
   * @param thecartItem 
   * 
   */
  addToCart(theCartItem:CartItem){
    let alreadyExistsInCart : boolean;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length > 0){
      
      existingCartItem = this.cartItems.find( temp =>  temp.id === theCartItem.id);

        alreadyExistsInCart = (existingCartItem!=undefined);
    }

    if(alreadyExistsInCart){
      existingCartItem.quantity++;
    }
    else{
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();

  
  }
  computeCartTotals() {
    let totalSum:number = 0;
    let totalQuantity : number = 0;
    for(let tempCartItem of this.cartItems){
        totalSum += tempCartItem.unitPrice * tempCartItem.quantity;
        totalQuantity += tempCartItem.quantity;
    }; 
    this.totalPrice.next(totalSum);
    this.totalQuantity.next(totalQuantity);

    //log cart data just for debugging 
    //this.logCartData(totalQuantity , totalSum);
  
  }
  logCartData(totalQuantity: number, totalSum: number) {
  console.log("contents of the cart");
  for(let temp of this.cartItems){
    const subTotalPrice = temp.quantity * temp.unitPrice;
    console.log(`name: ${temp.description},quantity= ${temp.quantity} ,
     unit Price=${temp.unitPrice} , subtotal=${subTotalPrice}`)
  }
  console.log(`total price= ${totalSum.toFixed(2)} , total Quantity=${totalQuantity}`)
  console.log("=====");
  }


  removeItem(theCartItem: CartItem) {
    let alreadyExistsInCart : boolean;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length > 0){
      
      existingCartItem = this.cartItems.find( temp =>  temp.id === theCartItem.id);

        alreadyExistsInCart = (existingCartItem!=undefined);
    }

    if(alreadyExistsInCart){
      existingCartItem.quantity--;
      if(existingCartItem.quantity === 0){
         this.remove(existingCartItem);
      }
    }
  

    this.computeCartTotals();
  }

  remove(carItem:CartItem ){
    const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === carItem.id );
    if(itemIndex >-1){
      this.cartItems.splice(itemIndex ,1);
      this.computeCartTotals();
    }
  }  

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
}