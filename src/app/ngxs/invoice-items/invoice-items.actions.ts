import { InvoiceItemModel } from '../../shared/models/invoice-item.model';

export class FetchInvoiceItems {
  static readonly type = '[InvoiceItems] FetchInvoiceItems';
  constructor(private payload: string) {
  }
}

export class FetchInvoiceItemsSuccess {
  static readonly type = '[InvoiceItems] FetchInvoiceItemsSuccess';

  constructor(private payload: InvoiceItemModel[]) {
  }
}

export class ResetInvoiceItems {
  static readonly type = '[InvoiceItems] ResetInvoiceItems';
}

export class AddInvoice {
  static readonly type = '[InvoiceItems] AddInvoice';
  constructor(private payload: any) {
  }
}

