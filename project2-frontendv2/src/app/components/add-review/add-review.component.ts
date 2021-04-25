import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css'] ,

})
export class AddReviewComponent implements OnInit {

  @ViewChild("rating") ratingElement: ElementRef;
  @ViewChild("comment") commentElement: ElementRef;

    rating : number[] = [1,2,3,4,5] ;
    comment : string ;
    userId : number;
    prodId : number;
    byteOrder : string;

    wrongRating : boolean = false;

    wrongComment : boolean = false;

    storage :Storage = sessionStorage;
    byteUser : any;



    submitted= false;
  route: any;
  constructor(private reviewService:ReviewService , private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.byteUser = JSON.parse(this.storage.getItem('byteU'));
  }


  getByteOrder(){

    // console.log(this.byteUser);
    // console.log("This is the user ID" +  this.byteUser.userId);
    this.reviewService.getByteOrders(this.activatedRoute.snapshot.paramMap.get('id'), this.byteUser.userId).subscribe(data => this.byteOrder = data)
  }

  onSubmit(event:any){
    this.submitted = true;



    let comment = this.commentElement.nativeElement.value;
    if(comment === ""){
      return;
    }
    let rating = this.ratingElement.nativeElement.value;
    if(rating <= 0 || rating > 5){
      return;
    }
    this.getByteOrder();
    if(this.byteOrder === undefined){
      return;
    }
     const body ={
    "comment":`${comment}`,
      "rating":`${this.ratingElement.nativeElement.value}`,
      "byteOrder":`http://bytebuildersbackend-env.eba-s2pnimcq.us-east-2.elasticbeanstalk.com/api/byte-order/${this.byteOrder.valueOf()}`
    }
    this.reviewService.addReview(this.activatedRoute.snapshot.paramMap.get('id') , body);
  }

}
