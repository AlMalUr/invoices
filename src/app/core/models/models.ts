export class CustomerModel {
  _id: string = null;
  name: string = null;
  address: string = null;
  phone: string = null;
}

export class ProductModel {
  _id: string = null;
  name: string = null;
  price: number = null;
}
export class InvoiceModel {
  _id: string = null;
  customer_id: string = null;
  discount: number = null;
  total: number = null;
  // items: InvoiceItem[] = [];
}
export class InvoiceItemModel {
  _id: string = null;
  invoice_id: string = null;
  product_id: string = null;
  quantity: number = null;
}
