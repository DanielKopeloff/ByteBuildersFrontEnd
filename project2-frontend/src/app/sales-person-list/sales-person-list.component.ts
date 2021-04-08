import { Component, OnInit } from '@angular/core';
import {SalesPerson} from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list-bootstrap.component.html',
  styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent implements OnInit {

  // create an array of objects

  salesPersonList: SalesPerson[] = [
    new SalesPerson('Anup' , 'Kumar' , 'anupKarm@google,com' , 353453545),
    new SalesPerson('John' , 'Doe' , 'John@doe.com' , 345345455345) ,
    new SalesPerson('Ronald' , 'mcdonald' , 'Mcd@Mcds.com' , 21) ,
    new SalesPerson('John' , 'Stone' , 'RestFulAPI@google.com' , 1)];
  constructor() { }

  ngOnInit(): void {
  }

}
