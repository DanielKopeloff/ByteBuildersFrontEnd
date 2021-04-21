import {Address} from "./address";
import {ByteUser} from "./byte-user";
import {ByteOrder} from "./byte-order";
import {ProductOrder} from "./product-order";

export class Purchase {
  byteUser: ByteUser;
  shippingAddress: Address;
  billingAddress: Address;
  byteOrder: ByteOrder;
  productOrders: ProductOrder[];
}
