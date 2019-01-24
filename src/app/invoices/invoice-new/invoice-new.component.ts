import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { CustomersService } from '../../core/services/customers.service';
import { ProductsService } from '../../core/services/products.service';
import { CustomerModel } from '../../shared/models/customer.model';
import { ProductModel } from '../../shared/models/product.model';

@Component({
  selector: 'app-invoice-new',
  templateUrl: './invoice-new.component.html',
  styleUrls: ['./invoice-new.component.scss']
})
export class InvoiceNewComponent implements OnInit {

  products$: Observable<ProductModel[]>;
  customers$: Observable<CustomerModel[]>;

  invoiceForm = this.fb.group({
    _id: [''],
    customer_id: [''],
    product_id: this.fb.array([
      this.fb.control('')
    ]),
    quantity: this.fb.array([
      this.fb.control('')
    ]),
    discount: [''],
    total: ['']

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
  });
  changeSelect(v) {
    const prods = this.invoiceForm.get('product_id') as FormArray;
    prods.push(this.fb.control(v));
  }

  constructor(private productsService: ProductsService,
              private customersService: CustomersService,
              private fb: FormBuilder
              ) {
  }

  ngOnInit() {
      this.products$ = this.productsService.products$;
      this.customers$ = this.customersService.customers$;
  }
  onSubmit() {
    console.log(this.invoiceForm.value);
  }
}


