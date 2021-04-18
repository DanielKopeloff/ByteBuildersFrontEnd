import { Product } from "./product";

export class CartItem {
  id:string;
  description:string;
  imageUrl : string ;
  unitPrice: number;
  
  quantity:number;

  constructor(product : Product){
  this.id = product.sku; 
  this.description = product.description;
  this.imageUrl = product.picture;
  this.unitPrice = product.price; 
  
  this.quantity = 1;
  }
}
