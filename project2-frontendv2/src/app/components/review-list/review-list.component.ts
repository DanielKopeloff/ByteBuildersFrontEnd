import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ByteUser } from 'src/app/common/byte-user';
import { Review } from 'src/app/common/review';
import { AuthService } from 'src/app/services/auth.service';
import { ByteUserService } from 'src/app/services/byte-user.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {



  prodId:number;

  tempReview: Review[];
  tempUser: ByteUser[];
  isAuth :boolean =false;

  constructor(private reviewService: ReviewService, private userService: ByteUserService ,private activatedRoute:ActivatedRoute) {
    

   }

  ngOnInit(): void {
    this.userService.setProdId(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getUsers();
    this.getReviews();

   
  }

  getReviews(){
     this.reviewService.getReviews().subscribe(
       data => {
         this.tempReview = data;
         console.log("this is the reviews " + data);

       }
     );

  }


  getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.tempUser = data
        console.log("this is the users" + data)

      }


    );
  }


}




