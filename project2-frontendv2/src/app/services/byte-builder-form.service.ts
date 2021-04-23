import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {State} from "../common/state";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ByteBuilderFormService {

  private statesUrl = 'http://localhost:9000/api/states?';
  public states = 'http://localhost:9000/api/states?';

  constructor(private httpClient: HttpClient) {
  }

  getStatesTest(){
    return this.httpClient.get<State[]>(this.states)
  }

  getStates(pageSize: number): Observable<GetResponseStates> {
    return this.httpClient.get<GetResponseStates>(this.statesUrl+`size=${pageSize}`);
  }


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
