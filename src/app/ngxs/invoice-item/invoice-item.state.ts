import { Action, Selector, State, StateContext } from '@ngxs/store';

import { InvoiceItemModel } from '../../shared/models/invoice-item.model';
import { InvoiceItemRequest, InvoiceItemRequestReset } from '../requests/invoice-item/invoice-item-request.action';

import { FetchInvoiceItem, FetchInvoiceItemSuccess, ResetInvoiceItem, } from './invoice-item.actions';

export class InvoiceItemStateModel {
  invoice: { [ids: string]: InvoiceItemModel };
  invoiceId: string[];
}

@State<InvoiceItemStateModel>({
  name: 'invoiceItem',
  defaults: {
    invoice: {},
    invoiceId: []
  }
})
export class InvoiceItemState {

  @Selector()
  static getInvoiceItem(state: InvoiceItemStateModel) {
    return state.invoiceId.map(id => state.invoice[id]);
  }

  @Action(FetchInvoiceItem)
  fetchInvoiceItem({dispatch}: StateContext<InvoiceItemModel>, {payload: id}: FetchInvoiceItem) {
    dispatch(new InvoiceItemRequest(id));
  }

  @Action(FetchInvoiceItemSuccess)
  fetchInvoiceItemSuccess(
    {patchState}: StateContext<InvoiceItemStateModel>,
    {payload: invoiceItem}: FetchInvoiceItemSuccess
  ) {
    patchState({
      invoice: invoiceItem.reduce((acc, item) => ({
        ...acc,
        [item._id]: item
      }), {}),
      invoiceId: invoiceItem.map(item => item._id)
    });
  }

  @Action(ResetInvoiceItem)
  resetInvoiceItem(
    {setState, dispatch}: StateContext<InvoiceItemStateModel>,
  ) {
    setState({
      invoice: {},
      invoiceId: []
    });
    dispatch(new InvoiceItemRequestReset());
  }

}

