import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product ();
  allReviews:boolean = false;
  addReviewForm : boolean = false;

  constructor(private productService: ProductService,
              private route: ActivatedRoute ,
              private cartService:CartService ,
              private reviewService : ReviewService) { }

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

  fillRating(rating : number){


  }

  seeReviews(product: Product){
    this.reviewService.setProdId(product.id);  
    this.allReviews = true;
     
  }

  addReview(product : Product){
    this.addReviewForm = true;
  }

}
