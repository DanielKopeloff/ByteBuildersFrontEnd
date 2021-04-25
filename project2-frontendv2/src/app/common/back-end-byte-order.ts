import { BackEndAddress } from "./back-end-address";
import { ByteOrder } from "./byte-order";

export class BackEndByteOrder {
  totalQuantity:number;
  totalPrice:number;
  status:string;
  byteUser : string;
  shippingAddress:string;
  billingAddress:string;
  _links : {
    self: {
      href:string;
    }
  }

  constructor(byteOrder :ByteOrder , shippingAddress:BackEndAddress , billing:BackEndAddress ,userId:number){
    this.totalPrice = byteOrder.totalPrice;
    this.totalQuantity = byteOrder.totalQuantity;
    this.shippingAddress = shippingAddress._links.self.href;
    this.billingAddress = billing._links.self.href;
    this.byteUser = `http://bytebuildersbackend-env.eba-s2pnimcq.us-east-2.elasticbeanstalk.com/${userId}`


  }
}
