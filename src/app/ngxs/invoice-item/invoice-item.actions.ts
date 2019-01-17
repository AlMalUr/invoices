import { InvoiceItemModel } from '../../shared/models/invoice-item.model';


export class FetchInvoiceItem {
  static readonly type = '[InvoiceItem] FetchInvoiceItem';
  constructor(private payload: string) {
  }
}

export class FetchInvoiceItemSuccess {
  static readonly type = '[InvoiceItem] FetchInvoiceItemSuccess';

  constructor(private payload: InvoiceItemModel[]) {
  }
}

export class ResetInvoiceItem {
  static readonly type = '[InvoiceItem] ResetInvoiceItem';
}
