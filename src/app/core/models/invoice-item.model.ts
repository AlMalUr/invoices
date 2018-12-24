export class InvoiceItemModel {

  _id: string = null;
  invoice_id: string = null;
  product_id: string = null;
  quantity: number = null;

  constructor(obj?) {
    for (const prop in obj) {
      if (typeof this[prop] !== 'undefined') {
        this[prop] = obj[prop];
      }
    }
  }
}
