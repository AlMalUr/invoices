import { Action, Selector, State, StateContext } from '@ngxs/store';

import { InvoiceItemModel } from '../../shared/models/invoice-item.model';
import { InvoiceItemRequestAction } from '../requests/invoice-item/invoice-item-request.action';

import { FetchInvoiceItem, FetchInvoiceItemFailed, FetchInvoiceItemSuccess } from './invoice-item.actions';

export class InvoiceItemStateModel {
  invoices: { [ids: string]: InvoiceItemModel };
  invoicesIds: string[];
}

@State<InvoiceItemStateModel>({
  name: 'invoiceItem',
  defaults: {
    invoices: {},
    invoicesIds: []
  }
})
export class InvoiceItemState {

  constructor(
  ) {
  }

  @Selector()
  static getInvoiceItem(state: InvoiceItemStateModel) {
    return state.invoicesIds.map(id => state.invoices[id]);
  }

  @Action(FetchInvoiceItem)
  fetchInvoiceItem({dispatch}: StateContext<InvoiceItemModel>, {payload: id}: FetchInvoiceItem) {
    dispatch(new InvoiceItemRequestAction(id));
  }

  @Action(FetchInvoiceItemSuccess)
  fetchInvoiceItemSuccess(
    {patchState}: StateContext<InvoiceItemStateModel>,
    {payload: invoiceItem}: FetchInvoiceItemSuccess
  ) {
    patchState({
      invoices: invoiceItem.reduce((acc, item) => ({
        ...acc,
        [item._id]: item
      }), {}),
      invoicesIds: invoiceItem.map(item => item._id)
    });
  }


  @Action(FetchInvoiceItemFailed)
  InvoiceItemFailed(
    {dispatch}: StateContext<InvoiceItemModel>,
    {payload: error}: FetchInvoiceItemFailed
  ) {

      console.error('An error occured: ', error.message);

  }

}

