import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  @ViewChild("rating") ratingElement: ElementRef;
  @ViewChild("comment") commentElement: ElementRef;

    rating : number[] = [1,2,3,4,5] ;
    comment : string ;
    userId : number;
    prodId : number;

    submitted= false;
  constructor(private reviewService:ReviewService , private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit(event:any){
    this.submitted = true;
     
      
     const body ={
    "comment":`${this.commentElement.nativeElement.value}`,
      "rating":`${this.ratingElement.nativeElement.value}`,
      "byteOrder":"http://localhost:8080/api/byte-order/1"
    }
    this.reviewService.addReview(this.activatedRoute.snapshot.paramMap.get('id') , body);
  }

}
