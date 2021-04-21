import {CartItem} from "./cart-item";

export class ProductOrder {
  quantity: number;
  productId: string;

  constructor(cartItem: CartItem) {
    this.quantity = cartItem.quantity;
    this.productId = cartItem.id;
  }

}
