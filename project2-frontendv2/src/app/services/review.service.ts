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

  private getAllReviews = 'http://localhost:8080/api/review/search/product_reviews';
  public getAllTest = 'http://localhost:8080/api/review/search/product_reviews';
  private getByteOrder= 'http://localhost:8080/api/byte-order/search/byteOrderReview/';
  private postReview = 'http://localhost:8080/api/review';


  constructor(private httpClient: HttpClient) { }

  getReviewsTest(){
    return this.httpClient.get<Review[]>(`${this.getAllTest}`);
  }

  getReviews():
  Observable<Review[]>{
    const searchUrl = `${this.getAllReviews}/?productId=${this.prodID}`
    return this.httpClient.get<GetResponseReviews>(searchUrl).pipe(
      map(response => response._embedded.reviews)
    );
  }


  addReview(prod:string , body :Object){
    this.httpClient.post<Review>(this.postReview ,body ).subscribe(data => alert( "Review was submitted at" +data.reviewCreated));
    alert("Please Click to continue")

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


