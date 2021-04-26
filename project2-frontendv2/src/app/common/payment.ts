
import { FrontEndPayment } from "./front-end-payment";

export class Payment {
  id: number ;
  creditCard:string ;
  expirationDateMonth:number;
  expirationDateYear:string;
  byteUser:string ="http://bytebuildersbackend-env.eba-s2pnimcq.us-east-2.elasticbeanstalk.com/api/byte-user/";
  _links: {

    self : {
      href : string;
    }

  }

  constructor(frontEndPayment : FrontEndPayment , userId : number){
    this.byteUser+=`${userId}`;
    this.creditCard = frontEndPayment.cardNumber;
    this.expirationDateMonth = Number(frontEndPayment.expirationMonth);
    this.expirationDateYear = frontEndPayment.expirationYear;
  }

}
