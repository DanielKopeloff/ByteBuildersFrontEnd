import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ByteUser} from '../common/byte-user';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ByteUserService {

  private baseUrl = 'http://localhost:8080/api/byte-user';

  constructor(private httpClient: HttpClient) { }

  getByteUserList(): Observable<ByteUser[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.byteUsers)
    );
  }
}

interface GetResponse {
  _embedded: {
    byteUsers: ByteUser[];
  };
}


