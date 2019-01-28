import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { CustomersService } from '../../core/services/customers.service';
import { InvoicesService } from '../../core/services/invoices.service';
import { ProductsService } from '../../core/services/products.service';
import { AddInvoice } from '../../ngxs/invoices/invoices.actions';
import { CustomerModel } from '../../shared/models/customer.model';
import { InvoiceModel } from '../../shared/models/invoice.model';
import { ProductModel } from '../../shared/models/product.model';


@Component({
  selector: 'app-invoice-new',
  templateUrl: './invoice-new.component.html',
  styleUrls: ['./invoice-new.component.scss']
})
export class InvoiceNewComponent implements OnInit {

  products$: Observable<ProductModel[]>;
  customers$: Observable<CustomerModel[]>;
 // invoices$: Observable<InvoiceModel[]>;
  invoiceForm;


  constructor(private productsService: ProductsService,
              private customersService: CustomersService,
             // private invoicesService: InvoicesService,
              private router: Router,
              private fb: FormBuilder,
              private store: Store
              ) {
  }

  ngOnInit() {

      this.products$ = this.productsService.products$;
      this.customers$ = this.customersService.customers$;
     // this.invoices$ = this.invoicesService.invoices$;
      this.invoiceForm = this.fb.group({
        _id: [''],
        customer: ['', Validators.required],
        products: this.fb.array([
          this.initProducts()
        ]),
        discount: [0, [Validators.min(0), Validators.max(50)]],
        total: ['']
      });
      this.invoiceForm.get('_id').setValue(
        this.generateId()
      );
  }

  onSubmit() {
    const date = new Date();
    console.log((date.getTimezoneOffset()));
    console.log(date.getDate());
    console.log(this.invoiceForm.value);
    this.store.dispatch( new AddInvoice(this.invoiceForm.value));
    this.router.navigate(['invoices']);
  }

  initProducts(): FormGroup {
    return this.fb.group({
      product : ['', Validators.required],
      quantity : [1],
    });
  }

  addProductField(): void {
    const prod = <FormArray>this.invoiceForm.controls.products;
    prod.push(this.initProducts());
  }

  deleteProductField(index) {
    const prod = <FormArray>this.invoiceForm.controls.products;
    if (prod.length > 1) {
      prod.removeAt(index);
    }
  }

  get quantity() {
    return this.invoiceForm.get('quantity').value;
  }
  get discount() {
    return this.invoiceForm.get('discount').value;
  }

  get total() {
    const itemTtl = this.invoiceForm.controls.products.value
    .map( prod =>
      (prod.product.price || 0) * prod.quantity / 100 * (100 - this.discount)
    );
    const ttl = itemTtl.reduce((acc, next) =>  acc + next).toFixed(2);
    this.invoiceForm.get('total').setValue(ttl);
    return ttl;
  }

  generateId() {
    const id = '5i' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return id;
  }
}


