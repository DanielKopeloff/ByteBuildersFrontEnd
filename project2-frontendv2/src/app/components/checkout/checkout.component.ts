import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ByteBuilderFormService} from "../../services/byte-builder-form.service";

import {ByteBuilderValidator} from "../../validators/byte-builder-validator";
import {CartService} from "../../services/cart.service";
import { State } from 'src/app/common/state';
import { FreeState } from 'src/app/common/free-state';


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

  states: any;


  
  stateArr : string[] = ['AL' ,'AK' , 'AZ' , 'AR' ,'CA' ,'CO' , 'CT' ,'DE' , 'FL' ,'GA' ,'HI' , 'ID' ,'IL' ,'IN' ,'IA' ,'KS' ,'KY' ,'LA' ,'ME' ,'MI' , 'MN' ,'MS' ,'MO' ,'MT' ,'NE' ,
  'NV' ,'NH' ,'NJ' , 'NM' ,'NY' ,'NC' ,'ND' ,'OH' ,'OK' ,'OR' ,'PA' ,'RI' ,'SC' ,'SD' ,'TN' , 'TX' , 'UT' ,'VT' ,'VA' ,'WA' ,'WV' ,'WI','WY'];
  pageSize = 50;

  freeStates : any ;


  constructor(private formBuilder: FormBuilder,
              private cartService: CartService,
              private byteBuilderService: ByteBuilderFormService) {
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

    // this.byteBuilderService.getStates(this.pageSize).subscribe(this.processResult());

    this.byteBuilderService.getToken().subscribe(data => {
  
      this.byteBuilderService.setToken(data)
      
    });
    

    setTimeout(()=> {this.getStates()} ,1250)
    

  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
  }

  getStates(){
    this.byteBuilderService.getFreeStates().subscribe(data => {
      this.states  = data;
      console.log(data);
     

    }); 
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
      console.log("This is inside the return"  + data)
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

enum Sates {
  AL = 'Alabama' , 
  AK = 'Alaska' ,
  AZ = 'Arizona' ,
  CA ='California' ,
  CO = 'Colorado' ,  
  CT = 'Connecticut' ,
  DE= 'Delaware' , 
  FL =' Florida' ,
  GA = 'Georgia' ,
  HI ='Hawaii' ,
  ID ='Idaho' ,
  IL ='Illinois' ,
  IN ='Indiana' ,
  IA = 'IOWA' , 
  KS = 'Kansas' ,
  KY = 'Kentucky' ,
  LA = 'Louisiana' ,
  ME ='Maine' ,

  



}