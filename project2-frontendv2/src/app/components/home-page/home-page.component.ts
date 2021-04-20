import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/common/category';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  categories: Category[];
  hotItems : Product[];
  newItems :Product[];
  currentCategoryId: number;

  constructor(private productService: ProductService ,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.listCategories();
    this.listProducts();
  }

  // tslint:disable-next-line:typedef
  listCategories() {
    this.productService.getCategories().subscribe(
      data => {
        //console.log('Product Categories=' + JSON.stringify(data));
        this.categories = data;
      }
    );
  };

  listProducts(){
    this.productService.getHotProductList().subscribe(
      data => {
        // console.log('Product Categories=' + JSON.stringify(data));
        this.hotItems = data;
         this.hotItems = this.hotItems.slice(0,8)
      }
    );

    this.productService.getNewProductList().subscribe(
      data => {
        // console.log('Product Categories=' + JSON.stringify(data));
        this.newItems = data;
         this.newItems = this.newItems.slice(0,8)
      }
    );

  }

  addToCart(tempProduct: Product){
    console.log(`Adding to cart ${tempProduct.description} , ${tempProduct.price}`);

    const theCartItem = new CartItem(tempProduct);

    this.cartService.addToCart(theCartItem);
  }
}


