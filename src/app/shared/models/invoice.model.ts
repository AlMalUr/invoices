import { InvoiceItemModel } from './invoice-item.model';

export class InvoiceModel {

  _id?: string = null;
  customer_id: string = null;
  discount: number = null;
  total: number = null;
  items?: InvoiceItemModel[] = [];

  constructor(obj?) {
    for (const prop in obj) {
      if (typeof this[prop] !== 'undefined') {
        this[prop] = obj[prop];
      }
    }
  }
}
