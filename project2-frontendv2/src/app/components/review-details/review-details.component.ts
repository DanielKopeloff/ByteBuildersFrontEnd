import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/common/review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.css']
})
export class ReviewDetailsComponent implements OnInit {

  reviews: Review[];
  
  constructor(private reviewService:ReviewService) { }

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews(){
    this.reviewService.getReviews().subscribe(
      data => {
        this.reviews = data;
        console.log("this is the reviews " + data);

      }
    );

 }


}
