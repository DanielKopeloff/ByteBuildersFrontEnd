import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ByteUserLogin } from "../common/byte-login-stuff";

export interface AuthReponse{
    expireDate: Date;
    date: string;
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    byteRole: number;
    profilePic: string;
    _token: string
}

@Injectable({providedIn: 'root'})
export class AuthService{
    user = new Subject<ByteUserLogin>();

    constructor(private http: HttpClient, private router: Router) {}

    signup(username: string, password: string,
        firstName: string, lastName: string,
        email: string, byteRole: number, profilePic: string){
        return this.http.post('http://localhost:8080/api/byte-user',
        {
            "username": username,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "byteRole": byteRole,
            "profilePic": profilePic
        }
        ).pipe(catchError(this.handleError));
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/home']);
    }

    login(username: string, password: string){
        return this.http.post<AuthReponse>('http://localhost:8080/authenticate',
        {
            "username": username,
            "password": password
        }
        ).pipe(catchError(this.handleError), tap(resData =>{
            const expirationDate =  new Date(new Date().getTime() + +resData.expireDate)
            const user = new ByteUserLogin( resData.id, resData.username, expirationDate, resData.email, resData._token
            );
            this.user.next(user);
        })

        );

    }

    private handleError(errorRes: HttpErrorResponse){

        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
        case `ERROR: duplicate key value violates unique constraint \"uk_p1syjsedfm3m0i6oj87jjbd6c\"\n  Detail: Key (username)=(inputUserNameHere) already exists.`:
            errorMessage = 'This username exists already';
        }
        return throwError(errorMessage);
    }
}
