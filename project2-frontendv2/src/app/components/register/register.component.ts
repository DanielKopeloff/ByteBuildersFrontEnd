import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ByteUserService} from '../../services/byte-user.service';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Register: FormGroup;
  loading = false;
  submitted = false;
  error: string;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private formBuilder: FormBuilder, private ByteUserService: ByteUserService) { }

  ngOnInit(): void {

    this.Register = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      role: ['1', Validators.required],
    });
  }

  // tslint:disable-next-line:typedef
  get f() { return this.Register.controls; }

  // tslint:disable-next-line:typedef
  onSubmit(){
    this.submitted = true;
    console.log(this.Register.value);
    if (this.Register.invalid){return; }

    // this.loading = true;
    this.ByteUserService.registerUser(this.Register.value);
      }

}
