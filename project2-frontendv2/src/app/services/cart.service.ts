import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Product} from '../common/product';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { CartItem } from '../common/cart-item';


@Injectable({
  providedIn: 'root'
})
export class CartService {


  private baseUrl = "http://localhost:8080/api/product/search/cart";
  cartItems:CartItem[] = [];

  /**
   * This is the session storage so if we refresh the page then the cart items will still be there
   */
  storage : Storage = sessionStorage;


  totalPrice : Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity : Subject<number> = new BehaviorSubject<number>(0);


  // read data from str
  constructor(private httpClient: HttpClient) {
    let data = JSON.parse(this.storage.getItem('cartItems'));

   

    if(data != null){
      this.cartItems = data;
      
    }
    // compute the totals

    this.computeCartTotals();
   
   }

  getCart(userID : number):
  Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/?userId=${userID}`
    // const searchUrl = `${this.baseUrl}/?userId=8`
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  /**
   * Check if we already have the item in the Cart
   * find the item in the cart based on item id
   * @param theCartItem
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

    this.persistCartItem();

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

  persistCartItem() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
}
