import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ByteUserLogin } from "../common/byte-login-stuff";


export interface AuthReponse{
    expireDate: string;
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
    storage: Storage = sessionStorage;
    byteUser : any;


    constructor(private http: HttpClient, private router: Router) {
        this.byteUser = JSON.parse(this.storage.getItem('byteU'));
        //console.log(this.byteUser);
    }

    signup(username: string, password: string,
        firstName: string, lastName: string,
        email: string, role: number, profilePic: string){
        return this.http.post('http://bytebuildersbackend-env.eba-s2pnimcq.us-east-2.elasticbeanstalk.com/api/byte-user',
        {
            "username": username,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "role": role,
            "profilePic": profilePic
        }
        ).pipe(catchError(errorRes =>{
            let errorMessage = 'Username already exists.';
            return throwError(errorMessage);
        }));
    }

    logout() {
        this.user.next(null);
        sessionStorage.clear();
        this.router.navigate(['/home']);
    }

    login(username: string, password: string){
        return this.http.post<AuthReponse>('http://bytebuildersbackend-env.eba-s2pnimcq.us-east-2.elasticbeanstalk.com/authenticate',
        {
            "username": username,
            "password": password
        }
        ).pipe(catchError(errorRes =>{
            let errorMessage = 'Invalid login credentials';
            return throwError(errorMessage);
        }), tap(resData =>{
            const expirationDate =  new Date(new Date().getTime() + +resData.expireDate)
            const user = new ByteUserLogin( resData.id, resData.username, expirationDate, resData.email, resData._token
            );
            this.user.next(user);
        })

        );

    }
}
