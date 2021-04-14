import {Component, OnInit} from '@angular/core';
import {ByteUser} from '../../common/byte-user';
import {ByteUserService} from '../../services/byte-user.service';

@Component({
  selector: 'app-byte-user-list',
  templateUrl: './byte-user-list.component.html',
  styleUrls: ['./byte-user-list.component.css']
})
export class ByteUserListComponent implements OnInit {

  byteUsers: ByteUser[];

  constructor(private byteUserService: ByteUserService) {
  }

  ngOnInit(): void {
    this.listByteUsers();
  }

  // tslint:disable-next-line:typedef
  listByteUsers() {
    this.byteUserService.getByteUserList().subscribe(
      data => {
        this.byteUsers = data;
      }
    );
  }

}
