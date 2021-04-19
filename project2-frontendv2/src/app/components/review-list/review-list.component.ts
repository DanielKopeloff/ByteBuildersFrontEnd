import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/common/review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  reviews : Review[];

  constructor(private reviewService : ReviewService) { }

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews(){
    this.reviewService.getReviews().subscribe(
      data => this.reviews = data
    );
  }



}
