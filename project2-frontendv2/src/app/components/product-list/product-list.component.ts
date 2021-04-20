import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import {ActivatedRoute} from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  searchMode = false;
  currentCategoryId = 1;
  previousCategoryId = 1;

  pageNumber = 1;
  pageSize = 5;
  totalElements = 0;

  previousKeyword = null;

  constructor(private productService: ProductService,
              private route: ActivatedRoute ,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  // tslint:disable-next-line:typedef
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  // tslint:disable-next-line:typedef
  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword');
    if (this.previousKeyword !== keyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = keyword;

    this.productService.searchProductsPaginate(this.pageNumber - 1, this.pageSize, keyword).subscribe(this.processResult());


    // now search for the products using keyword
    this.productService.searchProducts(keyword).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  // tslint:disable-next-line:typedef
  handleListProducts() {

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }


    if (this.previousCategoryId !== this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    // now get the products for the given category id
    this.productService.getProductListPaginate(
      this.pageNumber - 1,
      this.pageSize,
      this.currentCategoryId).subscribe(this.processResult()
    );
  }

  // tslint:disable-next-line:typedef
  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }

  // tslint:disable-next-line:typedef
  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }


  addToCart(tempProduct: Product){
   // console.log(`Adding to cart ${tempProduct.description} , ${tempProduct.price}`);

    const theCartItem = new CartItem(tempProduct);

    this.cartService.addToCart(theCartItem);
  }
}

