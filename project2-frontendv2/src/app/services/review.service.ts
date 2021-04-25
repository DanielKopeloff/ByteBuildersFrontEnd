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

  private getAllReviews = 'http://bytebuildersbackend-env.eba-s2pnimcq.us-east-2.elasticbeanstalk.com/api/review/search/product_reviews';
  public getAllTest = 'http://bytebuildersbackend-env.eba-s2pnimcq.us-east-2.elasticbeanstalk.com/api/review/search/product_reviews';
  private getByteOrder= 'http://bytebuildersbackend-env.eba-s2pnimcq.us-east-2.elasticbeanstalk.com/api/byte-order/search/byteOrderReview/';
  private postReview = 'http://bytebuildersbackend-env.eba-s2pnimcq.us-east-2.elasticbeanstalk.com/api/review';

 


  constructor(private httpClient: HttpClient) {
    this.getReviews();
   }

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
    this.httpClient.post<Review>(this.postReview ,body ).subscribe(data => alert( "Review was submitted at - " +data.reviewCreated));
    alert("Please Click to continue")

  }

  setProdId(prodId:number){
    this.prodID = prodId;
  }

  getByteOrders(prodId:string , userId:number){
    const searchUrl = `${this.getByteOrder}?productId=${prodId}&userId=${userId}`;
    console.log(searchUrl);
    return this.httpClient.get<string>(searchUrl).pipe(
      map(response => response.toString())
    );
  }

}



interface GetResponseReviews {
  _embedded: {
    reviews : Review[];
  };
}




