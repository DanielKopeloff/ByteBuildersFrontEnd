import { Product } from "./product";

export class CartItem {
  id:number;
  sku :string;
  description:string;
  imageUrl : string ;
  unitPrice: number;
  stock : number;

  quantity:number;

  constructor(product : Product){

  this.id = product.id;
  this.sku = product.sku;
  this.description = product.description;
  this.imageUrl = product.picture;
  this.unitPrice = product.price;
  this.stock = product.stock;
  this.quantity = 1;
  }
}
