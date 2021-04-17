import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/common/category';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  categories: Category[];
  products : Product[];
  currentCategoryId: number;

  constructor(private productService: ProductService) {
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
    this.productService.getAllProductList().subscribe(
      data => {
        // console.log('Product Categories=' + JSON.stringify(data));
        this.products = data;
         this.products = this.products.slice(0,8)
      }
    );  
  }
}


