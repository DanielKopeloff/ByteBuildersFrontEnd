import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ByteUser} from '../common/byte-user';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ByteUserService {

  prodId :string;

  private baseUrl = 'http://localhost:8080/api/byte-user';
  private users = 'http://localhost:8080/api/byte-user/search/reviewUsers?productId=';

  constructor(private httpClient: HttpClient) { }

  getByteUserList(): Observable<ByteUser[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.byteUsers)
    );
  }

  getUsers():Observable<ByteUser[]>{
    const searchUrl = `${this.users}${this.prodId}`
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.byteUsers)
    );
  }

  setProdId(prodId:string){
    this.prodId=prodId;
  }
}

interface GetResponse {
  _embedded: {
    byteUsers: ByteUser[];
  };
}




