import { Action, Selector, State, StateContext } from '@ngxs/store';

import { InvoiceItemModel } from '../../shared/models/invoice-item.model';
import { InvoiceItemRequest, InvoiceItemRequestReset } from '../requests/invoice-item/invoice-item-request.action';

import { FetchInvoiceItem, FetchInvoiceItemSuccess, ResetInvoiceItem, } from './invoice-item.actions';

export class InvoiceItemStateModel {
  entities: { [ids: string]: InvoiceItemModel };
  collectionIds: string[];
}

@State<InvoiceItemStateModel>({
  name: 'invoiceItem',
  defaults: {
    entities: {},
    collectionIds: []
  }
})
export class InvoiceItemState {

  @Selector()
  static getInvoiceItem(state: InvoiceItemStateModel) {
    return state.collectionIds.map(id => state.entities[id]);
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
      entities: invoiceItem.reduce((acc, item) => ({
        ...acc,
        [item._id]: item
      }), {}),
      collectionIds: invoiceItem.map(item => item._id)
    });
  }

  @Action(ResetInvoiceItem)
  resetInvoiceItem(
    {setState, dispatch}: StateContext<InvoiceItemStateModel>,
  ) {
    setState({
      entities: {},
      collectionIds: []
    });
    dispatch(new InvoiceItemRequestReset());
  }

}

