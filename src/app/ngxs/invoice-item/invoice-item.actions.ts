import { InvoiceItemModel } from '../../shared/models/invoice-item.model';
import { InvoiceModel } from '../../shared/models/invoice.model';
import { CustomerModel } from '../../shared/models/customer.model';


export class FetchInvoiceItem {
  static readonly type = '[InvoiceItem] FetchInvoiceItem';
  constructor(private payload: string) {
  }
}

export class FetchInvoiceItemSuccess {
  static readonly type = '[InvoiceItem] FetchInvoiceItemSuccess';

  constructor(private payload: InvoiceModel) {
  }
}

export class ResetInvoiceItem {
  static readonly type = '[InvoiceItem] ResetInvoiceItem';
}

export class FetchCustomerItem {
  static readonly type = '[InvoiceItem] FetchCustomerItem';
  constructor(private payload: string) {
  }
}

export class FetchCustomerItemSuccess {
  static readonly type = '[InvoiceItem] FetchInvoiceItemSuccess';

  constructor(private payload: CustomerModel) {
  }
}

