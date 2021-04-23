import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditByteUserService {


  storage: Storage = sessionStorage;
  byteUser : any;
  

  private baseUrl = 'http://localhost:8080/api/byte-user';

  constructor(private http: HttpClient) { 
    this.byteUser = JSON.parse(this.storage.getItem('byteU'));
    console.log(this.byteUser);
  }

  edit(username: string, password: string, 
    firstName: string, lastName: string, 
    email: string, role: number, profilePic: string){
    console.log(this.byteUser);
    console.log("This is the user ID" +  this.byteUser.userId);
    return this.http.put(`http://localhost:8080/api/byte-user/${this.byteUser.userId}`,
    {
        "username": username,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "role": role,
        "profilePic": profilePic
    }
    ).pipe(catchError(this.handleError));

}

  private handleError(errorRes: HttpErrorResponse){

    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
    return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
    case `What error could this cause?`:
        errorMessage = 'Weaved when you should of popped.';
    }
    return throwError(errorMessage);
  }
}
