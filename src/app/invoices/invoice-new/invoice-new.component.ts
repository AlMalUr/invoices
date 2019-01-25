import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { CustomersService } from '../../core/services/customers.service';
import { ProductsService } from '../../core/services/products.service';
import { CustomerModel } from '../../shared/models/customer.model';
import { ProductModel } from '../../shared/models/product.model';
import { find, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-new',
  templateUrl: './invoice-new.component.html',
  styleUrls: ['./invoice-new.component.scss']
})
export class InvoiceNewComponent implements OnInit {

  productPrice = 0;
  products$: Observable<ProductModel[]>;
  customers$: Observable<CustomerModel[]>;
  invoiceForm;
 //   _id: new FormControl(7),
 //   customer_id: new FormControl(''),
 //   quantity: new FormArray([
 //    // new FormControl()
 //   ]),
 //   discount: new FormControl(0),
 //   product_id: new FormArray([
 //    // new FormControl()
 //   ]),
 //   total: new FormControl(5657556)

  changeSelect(v) {
    const prods = this.invoiceForm.get('product_id') as FormArray;
    prods.push(this.fb.control(v));
  }

 // addProduct() {
 //   this.product.push(this.fb.control(''));
 // }
  constructor(private productsService: ProductsService,
              private customersService: CustomersService,
              private fb: FormBuilder
              ) {
  }

  ngOnInit() {
      this.products$ = this.productsService.products$;
      this.customers$ = this.customersService.customers$;
      this.invoiceForm = this.fb.group({
        _id: [''],
        customer: ['', Validators.required],
        product: ['', Validators.required],
       // product_id: this.fb.array([
       //   this.fb.control('')
       // ]),
        quantity:  ['', [Validators.min(1), Validators.required]],
        // quantity: this.fb.array([
        //   this.fb.control('')
        // ]),
        discount: ['', [Validators.min(0), Validators.max(50)]],
        total: ['']
      });
  }
  onSubmit() {
    console.log(this.invoiceForm.value);
  }
  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }
  get quantity() {
    return this.invoiceForm.get('quantity').value;
  }
  get discount() {
    return this.invoiceForm.get('discount').value;
  }

   getProductPrice(price) {
     this.productPrice = price;
  }
  get total() {
    const ttl = (this.productPrice * this.quantity / 100 * (100 - this.discount)).toFixed(2);
   // this.invoiceForm.set('total').value = ttl;
    return ttl;
  }

}


