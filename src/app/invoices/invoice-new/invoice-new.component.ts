import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { startWith, withLatestFrom } from 'rxjs/operators';

import { CustomersService } from '../../core/services/customers.service';
import { ModalService } from '../../core/services/modal.service';
import { ProductsService } from '../../core/services/products.service';

import { CreateInvoice } from '../../ngxs/invoices/invoices.actions';
import { PostInvoiceRequestState } from '../../ngxs/requests/invoice/invoice-post-request.state';
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

  itemsPriceSubscription: Subscription;
  totalPriceSubscription: Subscription;

  submitted = new BehaviorSubject(false);

  isEdited: Subscription;

  // canDeactivateEvent = new Subject();
  // navigatePermission$: Observable<boolean>;

  @Select(PostInvoiceRequestState.getStatus) status$;

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

    //this.navigatePermission$ = this.canDeactivateEvent.pipe(

   // );

    this.itemsPriceSubscription = this.items.valueChanges.pipe(
      withLatestFrom(this.products$),
    )
    .subscribe(([items, products]) => {
      const itemForm = items.map(item => {
        const price = item.product_id ?
          products.find(p => p._id === item.product_id).price * item.quantity : 0;
        item.price = price;
        return item;
      });
      this.items.patchValue(itemForm, {emitEvent: false});
    });

    this.totalPriceSubscription = combineLatest(
      this.items.valueChanges,
      this.discount.valueChanges.pipe(startWith(0))
    ).subscribe(([itemsPrice, discount]) => {
      const itemsPriceTotal = itemsPrice.map(item => item.price).reduce((acc, val) => acc + val);
      const total = (itemsPriceTotal / 100 * (100 - discount));
      this.total.patchValue(total, {emitEvent: false});
    });

    this.isEdited = this.items.valueChanges.subscribe(itemsArray => {
      if (itemsArray.length) {
        const prod = !itemsArray.find(item => item.product_id === null);
        const quant = !itemsArray.find(item => item.quantity === 0);
        if (prod && quant) {
          this.addProductField();
        }
      }
    });
  }

  ngOnDestroy() {
    this.itemsPriceSubscription.unsubscribe();
    this.totalPriceSubscription.unsubscribe();
  }

  createInvoice() {
    this.submitted.next(true);
    this.items.value.pop();
    this.store.dispatch(
      new CreateInvoice(this.invoiceForm.value)
    );
  }

  initForm() {
    this.invoiceForm = new FormGroup({
      customer_id: new FormControl(null),
      items: new FormArray([], this.minLengthArrayValidator(2)),
      discount: new FormControl(0, [Validators.min(0), Validators.max(50), Validators.required]),
      total: new FormControl(0)
    });
    this.addProductField();
  }

  initFormItems(): FormGroup {
    return new FormGroup({
      invoice_id: new FormControl(null),
      product_id: new FormControl(null),
      quantity: new FormControl(1, [ Validators.min(1)]),
      price: new FormControl(0)
    });
  }

  minLengthArrayValidator(min: number): ValidatorFn {
    return (items: AbstractControl) => {
      if (items.value.length >= min) {
        return null;
      }
      return {'minLengthArray': {valid: false}};
    };
  }

  addProductField(): void {
    const item = this.initFormItems();
    this.items.push(item);
  }

  deleteProductField(index) {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    //this.canDeactivateEvent.next();
    //return this.navigatePermission$;

     if ((this.invoiceForm.touched && this.submitted.getValue()) || !this.invoiceForm.touched) {
       return true;
     }
     return this.modalService.confirmModal();
  }
}

