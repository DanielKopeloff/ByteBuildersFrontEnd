import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ByteUser} from '../common/byte-user';
import {config, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ByteUserService {

  private baseUrl = 'http://localhost:8080/api/byte-user';

  private baseLogin = 'http://localhost:8080/authenticate';

  constructor(private httpClient: HttpClient) { }

  getByteUserList(): Observable<ByteUser[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.byteUsers)
    );
  }

  // tslint:disable-next-line:typedef
  registerUser(user) {
    return this.httpClient.post(this.baseUrl, user).subscribe((result) => {
      console.warn('result', result);
    });
  }

  // tslint:disable-next-line:typedef
  LoginUser(user) {
    return this.httpClient.post(this.baseLogin, user).subscribe((result) => {
      console.warn('result', result);
    });
  }
}

interface GetResponse {
  _embedded: {
    byteUsers: ByteUser[];
  };
}


