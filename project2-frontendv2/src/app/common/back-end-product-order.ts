import { ByteOrder } from "./byte-order";


export class BackEndProductOrder {
  product:string;
  byteOrder:string ;
  quantity:number;

  constructor(product:number , byteOrder : ByteOrder , quantity: number){
    this.product = `http://localhost:8080/api/product/${product}`
    this.byteOrder = byteOrder._links.self.href;
    this.quantity = quantity;


  }

}
