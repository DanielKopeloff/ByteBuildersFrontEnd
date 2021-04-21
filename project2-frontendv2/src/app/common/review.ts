
import { ByteUser } from "./byte-user";

export class Review {
  id: number;
  comment : string ;
  reviewCreated : string;
  reviewTerminated: string = null;
  rating : number
  byteOrderId:number ;

}
