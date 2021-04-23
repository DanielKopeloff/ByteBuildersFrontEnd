import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../common/product';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Category} from '../common/category';
import {Post} from "../models/post.model";
//import {Post} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:9000/api/product';
  public baseUrlTest = 'http://localhost:9000/api/product';
  private categoryUrl = 'http://localhost:9000/api/category';
  private hotUrl = 'http://localhost:9000/api/product/search/hotItems';
  private newItemsUrl = 'http://localhost:9000/api/product/search/newItems';

  constructor(private httpClient: HttpClient) {
  }

  getPostTest(){
    return this.httpClient.get<Product[]>(`${this.baseUrlTest}`);
  }

  getProductListPaginate(page: number, pageSize: number, categoryId: number): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.getProducts(searchUrl);
  }

  getHotProductList(): Observable<Product[]> {

    return this.httpClient.get<GetResponseProducts>(this.hotUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getNewProductList(): Observable<Product[]> {

    return this.httpClient.get<GetResponseProducts>(this.newItemsUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<GetResponseCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.category)
    );
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByDescriptionContainingIgnoreCase?name=${keyword}`;
    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(page: number, pageSize: number, keyword: string): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByDescriptionContainingIgnoreCase?name=${keyword}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  // tslint:disable-next-line:typedef
  private getProducts(searchUrl: string) {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  };
}

interface GetResponseCategory {
  _embedded: {
    category: Category[];
  };
}
