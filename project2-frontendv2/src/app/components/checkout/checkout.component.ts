import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ByteBuilderFormService} from "../../services/byte-builder-form.service";

import {ByteBuilderValidator} from "../../validators/byte-builder-validator";
import {CartService} from "../../services/cart.service";
import {State} from "../../common/state";
import {Router} from "@angular/router";
import {CheckoutService} from "../../services/checkout.service";
import {ByteOrder} from "../../common/byte-order";
import {ProductOrder} from "../../common/product-order";
import {Purchase} from "../../common/purchase";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  totalPrice = 0;
  totalQuantity = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  states: State[] = [];
  pageSize = 50;

  constructor(private formBuilder: FormBuilder,
              private cartService: CartService,
              private byteBuilderService: ByteBuilderFormService,
              private checkoutService: CheckoutService,
              private router: Router) {
  }

  get firstName() {
    return this.checkoutFormGroup.get('byteUser.firstName');
  }

  get lastName() {
    return this.checkoutFormGroup.get('byteUser.lastName');
  }

  get email() {
    return this.checkoutFormGroup.get('byteUser.email');
  }

  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }

  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }

  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }

  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }

  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }

  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }

  get billingAddressState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }

  get billingAddressZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }

  get creditCardType() {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }

  get creditCardName() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }

  get creditCardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }

  get creditCardSecurityCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }

  ngOnInit(): void {

    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      byteUser: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, ByteBuilderValidator.noWhiteSpace]),
        lastName: new FormControl('', [Validators.required, ByteBuilderValidator.noWhiteSpace]),
        email: new FormControl('', [Validators.required, Validators.email])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, ByteBuilderValidator.noWhiteSpace]),
        city: new FormControl('', [Validators.required, ByteBuilderValidator.noWhiteSpace]),
        state: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, ByteBuilderValidator.noWhiteSpace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, ByteBuilderValidator.noWhiteSpace]),
        city: new FormControl('', [Validators.required, ByteBuilderValidator.noWhiteSpace]),
        state: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, ByteBuilderValidator.noWhiteSpace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, ByteBuilderValidator.noWhiteSpace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: new FormControl('', [Validators.required]),
        expirationYear: new FormControl('', [Validators.required])
      }),
    });

    const startMonth: number = new Date().getMonth() + 1;

    this.byteBuilderService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    )

    this.byteBuilderService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    )

    this.byteBuilderService.getStates(this.pageSize).subscribe(this.processResult());

  }

  onSubmit() {

    console.log(this.totalPrice);

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }

    let byteOrder = new ByteOrder();
    byteOrder.totalPrice = this.totalPrice;
    byteOrder.totalQuantity = this.totalQuantity;

    const cartItems = this.cartService.cartItems;

    let productOrders: ProductOrder[] = cartItems.map(cartItem => new ProductOrder(cartItem));
    console.log(productOrders);

    let purchase = new Purchase();

    purchase.byteUser = this.checkoutFormGroup.controls['byteUser'].value;
    console.log(purchase.byteUser);

    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    purchase.shippingAddress.state = shippingState.stateName;

    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingAddress: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    purchase.billingAddress.state = billingAddress.stateName;

    purchase.byteOrder = byteOrder;
    purchase.productOrders = productOrders;

    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next: response => {
          alert(`Your order has been submitted!`)
          this.resetCart();
        },
        error: err => {
          alert(`There was an error: ${err.message}`);
        }
      }
    );
  }

  resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.checkoutFormGroup.reset();
    this.router.navigateByUrl("/home");
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.byteBuilderService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );
  }

  processResult() {
    return data => {
      this.states = data._embedded.states;
      this.pageSize = data.page.size;
    };
  }



  private reviewCartDetails() {
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }
}
