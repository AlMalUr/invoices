import { Action, Selector, State, StateContext } from '@ngxs/store';

import { InvoiceItemModel } from '../../shared/models/invoice-item.model';
import { InvoiceItemRequest, InvoiceItemRequestReset } from '../requests/invoice-item/invoice-item-request.action';

import {
  FetchInvoiceItem,
  FetchInvoiceItemSuccess,
  ResetInvoiceItem,
} from './invoice-item.actions';
import { InvoicesStateModel } from '../invoices/invoices.state';

export class InvoiceItemStateModel {
  entities: { [ids: string]: InvoiceItemModel };
  collectionIds: string[];
}

@State<InvoiceItemStateModel>({
  name: 'invoiceItem',
  defaults: {
    entities: {},
    collectionIds: [],
  }
})
export class InvoiceItemState {

  @Selector()
  static getInvoiceItems(
    state: InvoiceItemStateModel,
  ) {
    return state.entities;
  }
  @Selector()
  static getProductIds(state: InvoiceItemStateModel) {
    return state.collectionIds.map(id => state.entities[id].product_id);
  }

  @Action(FetchInvoiceItem)
  fetchInvoiceItem({dispatch}: StateContext<InvoiceItemStateModel>, {payload: id}: FetchInvoiceItem) {
    dispatch(new InvoiceItemRequest(id));
  }

  @Action(FetchInvoiceItemSuccess)
  fetchInvoiceItemSuccess(
    {setState}: StateContext<InvoiceItemStateModel>,
    {payload: custom}: FetchInvoiceItemSuccess
  ) {
    setState({
      entities: custom.reduce((acc, item) => ({
        ...acc,
        [item._id]: item
      }), {}),
      collectionIds: custom.map(item => item._id)
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

