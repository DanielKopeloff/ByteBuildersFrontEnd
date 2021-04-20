import { Component, OnInit } from '@angular/core';
import { ByteUser } from 'src/app/common/byte-user';
import { ByteUserService } from 'src/app/services/byte-user.service';

@Component({
  selector: 'app-user-review-info',
  templateUrl: './user-review-info.component.html',
  styleUrls: ['./user-review-info.component.css']
})
export class UserReviewInfoComponent implements OnInit {

  users : ByteUser[];
  constructor(private userService:ByteUserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data
        console.log("this is the users" + data)

      }


    );
  }

}
