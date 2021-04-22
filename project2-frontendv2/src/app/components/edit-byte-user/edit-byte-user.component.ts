import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EditByteUserService } from 'src/app/services/edit-byte-user.service';

@Component({
  selector: 'app-edit-byte-user',
  templateUrl: './edit-byte-user.component.html',
  styleUrls: ['./edit-byte-user.component.css']
})
export class EditByteUserComponent implements OnInit {
  isLoading = false;
  error: string = null;

  constructor(private editByteUserService: EditByteUserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const username = form.value.username;
    const password = form.value.password;
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const role = form.value.role;
    const profilePic = form.value.profilePic;

    this.isLoading = true;

    this.editByteUserService.edit(username,password, firstName, lastName, email, role, profilePic).subscribe(
      resData =>{
          console.log(resData);
          this.isLoading = false;
      },
      errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
      }
  );

  }
}
