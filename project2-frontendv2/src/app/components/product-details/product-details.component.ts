import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product ();

  constructor(private productService: ProductService,
              private route: ActivatedRoute ,
              private cartService:CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  // tslint:disable-next-line:typedef
  handleProductDetails( ) {
    const productId: number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
      }
    );
  }

    
  addToCart(tempProduct: Product){
    console.log(`Adding to cart ${tempProduct.description} , ${tempProduct.price}`);

    const theCartItem = new CartItem(tempProduct);

    this.cartService.addToCart(theCartItem);
  }

}
