import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ByteUser } from '../common/byte-user';

@Injectable({
  providedIn: 'root'
})
export class EditByteUserService {


  storage: Storage = sessionStorage;
  byteUser: any;


  private baseUrl = 'http://localhost:8080/api/byte-user';

  constructor(private http: HttpClient) {
    this.byteUser = JSON.parse(this.storage.getItem('byteU'));
    console.log(this.byteUser);
  }

  // edit(username: string, password: string,
  //   firstName: string, lastName: string,
  //   email: string, role: number, profilePic: string) {
  //   const searchUrl = `http://localhost:8080/api/byte-user/${this.byteUser.userId}`;
  //   let currUser: ByteUser;
  //   this.http.get<ByteUser>(searchUrl).subscribe(data => {

  //     currUser.username = username;
  //     currUser.password = password;
  //     currUser.firstName = firstName;
  //     currUser.lastName = lastName;
  //     currUser.email = email;
  //     currUser.byteRole = role;
  //     currUser.profilePic = profilePic;

  //     return this.http.post('http://localhost:8080/api/byte-user',
  //     {
  //         "username": currUser.username,
  //         "password": currUser.password,
  //         "firstName": currUser.firstName,
  //         "lastName": currUser.lastName,
  //         "email": currUser.email,
  //         "role": currUser.byteRole,
  //         "profilePic": currUser.profilePic
  //     }
  //     ).pipe(catchError(errorRes =>{
  //         let errorMessage = 'Username already exists.';
  //         return throwError(errorMessage);
  //     }));
  //   })
  // }



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
          "profilePic": profilePic,
          "userCreated": this.byteUser.userCreated
      }
      ).pipe(catchError(this.handleError));

  }

    private handleError(errorRes: HttpErrorResponse){

      let errorMessage = 'Username unavailable';
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
