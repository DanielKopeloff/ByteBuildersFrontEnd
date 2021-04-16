import { Component, OnInit } from '@angular/core';
import {Category} from '../../common/category';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.listCategories();
  }

  // tslint:disable-next-line:typedef
  listCategories() {
    this.productService.getCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.categories = data;
      }
    );
  }
}
