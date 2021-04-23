import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { ReviewService } from 'src/app/services/review.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { ByteUserLogin } from 'src/app/common/byte-login-stuff';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product ();
  allReviews:boolean = false;
  addReviewForm : boolean = false;

  user : any;
  
  isAuth : boolean;

  storage : Storage = sessionStorage;


  


  constructor(private productService: ProductService,
              private route: ActivatedRoute ,
              private cartService:CartService ,
              private reviewService : ReviewService ){ }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });

    this.checkUser();
  }
  checkUser() {
      
      if(JSON.parse(this.storage.getItem('byteU')) != null){
        this.isAuth = true;
      }
    
    
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
    //console.log(`Adding to cart ${tempProduct.description} , ${tempProduct.price}`);

    const theCartItem = new CartItem(tempProduct);

    this.cartService.addToCart(theCartItem);
  }

  fillRating(rating : number){


  }

  seeReviews(product: Product){
    this.reviewService.setProdId(product.id);  
    this.allReviews = true;
     
  }

  addReview(){
    this.addReviewForm = true;
  }

}
