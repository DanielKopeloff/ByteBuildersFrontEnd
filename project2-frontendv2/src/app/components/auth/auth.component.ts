import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthReponse, AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if(!form.valid){
            return;
        }

        const username = form.value.username;
        const password = form.value.password;
        const firstName = form.value.firstName;
        const lastName = form.value.lastName;
        const email = form.value.email;
        const byteRole = form.value.byteRole;
        const profilePic = form.value.profilePic;

        let authObs: Observable<AuthReponse>;// replace code for if else with this but ehh

        this.isLoading = true;
        if(this.isLoginMode){
            this.authService.login(username,password).subscribe(
                resData =>{
                    console.log(resData);
                    this.isLoading = false;
                    this.router.navigate(['/home']);//on sucessful login go to home page
                },
                errorMessage => {
                    console.log(errorMessage);
                    this.error = errorMessage;
                    this.isLoading = false;
                }
            );
        } else{
            this.authService.signup(username,password, firstName, lastName, email, byteRole, profilePic).subscribe(
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

        form.reset();
    }
}