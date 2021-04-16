import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../common/product';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Category} from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/product';
  private categoryUrl = 'http://localhost:8080/api/category';

  constructor(private httpClient: HttpClient) {
  }

  getProductList(categoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<GetResponseCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.category)
    );
  }
}
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
}

interface GetResponseCategory {
  _embedded: {
    category: Category[];
  };
}
