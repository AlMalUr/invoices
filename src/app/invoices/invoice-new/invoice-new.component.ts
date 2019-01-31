import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngxs/store';
import { BehaviorSubject, combineLatest, Observable, of, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { CustomersService } from '../../core/services/customers.service';
import { ModalService } from '../../core/services/modal.service';
import { ProductsService } from '../../core/services/products.service';
import { PostInvoice } from '../../ngxs/invoice/invoice-post.actions';
import { CustomerModel } from '../../shared/models/customer.model';
import { ProductModel } from '../../shared/models/product.model';


@Component({
  selector: 'app-invoice-new',
  templateUrl: './invoice-new.component.html',
  styleUrls: ['./invoice-new.component.scss']
})
export class InvoiceNewComponent implements OnInit, OnDestroy {

  products$: Observable<ProductModel[]>;
  customers$: Observable<CustomerModel[]>;
  invoiceForm: FormGroup;
  itemsPrice: Subscription;
  totalPrice: Subscription;
  submitted = new BehaviorSubject(false);


  constructor(
    private productsService: ProductsService,
    private customersService: CustomersService,
    public modalService: ModalService,
    private store: Store
  ) {
  }

  get total() {
    return this.invoiceForm.get('total') as FormControl;
  }

  get items() {
    return this.invoiceForm.get('items') as FormArray;
  }

  get discount() {
    return this.invoiceForm.get('discount') as FormControl;
  }

  ngOnInit() {
    this.products$ = this.productsService.products$;
    this.customers$ = this.customersService.customers$;
    this.initForm();
    this.itemsPrice = combineLatest(
      this.items.valueChanges,
      this.products$
    ).subscribe(([items, products]) => {
      const itemForm = items.map(item => {
        const price = item.product_id ?
          products.find(p => p._id === item.product_id).price * item.quantity : 0;
        item.price = price;
        return item;
      });
      this.items.patchValue(itemForm, {emitEvent: false});
    });
    this.totalPrice = combineLatest(
      this.items.valueChanges,
      this.discount.valueChanges.pipe(startWith(0))
    ).subscribe(([itemsPrice, discount]) => {
        const itemsPriceTotal = itemsPrice.map(item => item.price).reduce((acc, val) => acc + val);
        const total = (itemsPriceTotal / 100 * (100 - discount));
        this.total.patchValue(total, {emitEvent: false});
    });

  }

  ngOnDestroy() {
    this.itemsPrice.unsubscribe();
    this.totalPrice.unsubscribe();
  }

  onSubmit() {
    this.submitted.next(true);
    this.store.dispatch( new PostInvoice(this.invoiceForm.value));
   // this.store.dispatch( new PostInvoiceItems(this.invoiceForm.value.items));
  }

  initForm() {
    this.invoiceForm = new FormGroup({
      customer_id: new FormControl(null, Validators.required),
      items: new FormArray([this.initFormItems()]),
      discount: new FormControl(0, [Validators.min(0), Validators.max(50), Validators.required]),
      total: new FormControl(0)
    });
  }

  initFormItems(): FormGroup {
    return new FormGroup({
      invoice_id: new FormControl(null),
      product_id: new FormControl(null, Validators.required),
      quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
      price: new FormControl(0)
    });
  }

  addProductField(): void {
    this.items.push(this.initFormItems());
  }

  deleteProductField(index) {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    if ((this.invoiceForm.touched && this.submitted.getValue()) || !this.invoiceForm.touched) {
      return true;
    }
    return this.modalService.confirmModal();
  }
}
