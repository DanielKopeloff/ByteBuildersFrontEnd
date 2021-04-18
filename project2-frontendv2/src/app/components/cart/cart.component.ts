import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import {Product} from '../../common/product';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products : Product[];
  userId : number;
  total : number;
  

  constructor(private cartService: CartService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listProducts();
  
  }

  listProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.userId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.userId = 1;
    }
    this.cartService.getCart(this.userId).subscribe(
      data => {
         //console.log('Product in cart=' + JSON.stringify(data));
        this.products = data;
        this.total = this.cartTotal();
      }
    );  
  }

  cartTotal(){
    let sum = 0;
    for(let product of this.products ){
      sum += product.price;
    }

    console.log(sum);
    return sum;

  }

}
