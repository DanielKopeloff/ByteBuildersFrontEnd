import { Address } from "./address";

export class BackEndAddress {
  id : number;
  streetAddress : string ;
  city : string ;
  state : string ;
  zip : string ;
  _links : {
    self: {
      href:string;
    }
  }

  constructor(address : Address){
    this.streetAddress = address.street;
    this.city = address.city;
    this.state = address.state;
    this.zip = address.zipCode;
  }

}
