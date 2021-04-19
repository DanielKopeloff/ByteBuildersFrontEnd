import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { Review } from '../common/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  prodID : number;

  private baseUrl = 'http://localhost:8080/api/review/search/product_reviews';

  constructor(private httpClient: HttpClient) { }

  getReviews():
  Observable<Review[]>{
    const searchUrl = `${this.baseUrl}/?productId=${this.prodID}`
    return this.httpClient.get<GetResponseReviews>(searchUrl).pipe(
      map(response => response._embedded.reviews)
    );
  }

  addReview(prod:Product){
    // get the user Id 


  }

  setProdId(prodId:number){
    this.prodID = prodId;
  }

}

interface GetResponseReviews {
  _embedded: {
    reviews : Review[];
  };
}
