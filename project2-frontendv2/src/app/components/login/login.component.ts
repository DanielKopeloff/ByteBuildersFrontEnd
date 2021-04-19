import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ByteUserService} from '../../services/byte-user.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private formBuilder: FormBuilder, private ByteUserService: ByteUserService) {
    // formBuilder.createSection('#myForm', myData);

  }

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  // tslint:disable-next-line:typedef
  onSubmit(){
    this.submitted = true;
    console.log(this.LoginForm.value);
    if (this.LoginForm.invalid){return; }

    this.loading = true;
    this.ByteUserService.LoginUser(this.LoginForm.value);
  }

}
