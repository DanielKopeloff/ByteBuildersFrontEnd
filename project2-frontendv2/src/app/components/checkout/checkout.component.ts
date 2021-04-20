import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ByteBuilderFormService} from "../../services/byte-builder-form.service";
import {State} from "../../common/state";

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
              private byteBuilderService: ByteBuilderFormService) {
  }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      byteUser: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl(
          '',
          [Validators.required, Validators.email])
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
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
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
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

  get firstName() {
    return this.checkoutFormGroup.get('byteUser.firstName');
  }
  get lastName () {
    return this.checkoutFormGroup.get('byteUser.lastName');
  }
  get email() {
    return this.checkoutFormGroup.get('byteUser.email');
  }

  processResult() {
    return data => {
      this.states = data._embedded.states;
      this.pageSize = data.page.size;
    };
  }
}
