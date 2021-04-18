import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import {Product} from '../../common/product';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products : CartItem[] = this.cartService.cartItems;
  userId : number;
  totalPrice : number;
  totalQuantity : number;
  

  constructor(private cartService: CartService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listProducts();
  
  }

  listProducts(){
    this.products = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data=> this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data=> this.totalQuantity = data
    );


    this.cartService.computeCartTotals();

    // const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    // if (hasCategoryId) {
    //   this.userId = +this.route.snapshot.paramMap.get('id');
    // } else {
    //   this.userId = 1;
    // }
    // this.cartService.getCart(this.userId).subscribe(
    //   data => {
    //      //console.log('Product in cart=' + JSON.stringify(data));
    //     this.products = data;
    //     this.total = this.cartTotal();
    //   }
    // );  
  }

  cartTotal(){
    let sum = 0;
    for(let product of this.products ){
      sum += product.unitPrice * product.quantity;
    }

    console.log(sum);
    return sum;

  }

  incrementQuantity(cartItem:CartItem ){
      this.cartService.addToCart(cartItem);

  }

  decrementQuantity(cartItem:CartItem){
    this.cartService.removeItem(cartItem);
  }

  remove(cartItem){
    this.cartService.remove(cartItem);
  }

}
