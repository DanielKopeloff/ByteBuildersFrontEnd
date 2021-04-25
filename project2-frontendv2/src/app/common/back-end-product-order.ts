import { ByteOrder } from "./byte-order";


export class BackEndProductOrder {
  product:string;
  byteOrder:string ;
  quantity:number;

  constructor(product:number , byteOrder : ByteOrder , quantity: number){
    this.product = `http://bytebuildersbackend-env.eba-s2pnimcq.us-east-2.elasticbeanstalk.com/api/product/${product}`
    this.byteOrder = byteOrder._links.self.href;
    this.quantity = quantity;


  }

}
