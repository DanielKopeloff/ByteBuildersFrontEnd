import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {State} from "../common/state";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ByteBuilderFormService {

  // private statesUrl = 'http://localhost:8080/api/states?';
  public states = 'http://bytebuildersbackend-env.eba-s2pnimcq.us-east-2.elasticbeanstalk.com/api/states?';


  private headersStates : HttpHeaders;


 

  


  


  constructor(private httpClient: HttpClient) {
    
  }

  getStatesTest(){
    return this.httpClient.get<State[]>(this.states)
  }

  // getStates(pageSize: number): Observable<GetResponseStates> {
  //   return this.httpClient.get<GetResponseStates>(this.statesUrl+`size=${pageSize}`);
  // }



  // setToken(token:Object){


  //   console.log( " This is the string before the splice" + JSON.stringify(token))
  //   let stringToken = JSON.stringify(token).slice(15,JSON.stringify(token).length -2) ;
 

  //   this.headersStates = new HttpHeaders()
  //   .set("accept", " application/Json")
  //   .set("authorization",` Bearer ${stringToken}`) ;


  // }



  

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    for (let month = startMonth; month <= 12; month++) {
      data.push(month);
    }
    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let year = startYear; year <= endYear; year++) {
      data.push(year);
    }
    return of(data);
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponsePublicAPI {
  _embedded: {
    auth_token: string;
  },
  
}

interface GetStates {
  _embedded: {
    states: State[];
  },
  
}
