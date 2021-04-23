import {CartItem} from "./cart-item";

export class ProductOrder {
  quantity: number;
  productId: number;
  orderId:number;

  constructor(cartItem: CartItem) {
    this.quantity = cartItem.quantity;
    this.productId = cartItem.id;
  }

}
