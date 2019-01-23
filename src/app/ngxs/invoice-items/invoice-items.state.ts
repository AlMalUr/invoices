import { Action, Selector, State, StateContext } from '@ngxs/store';

import { InvoiceItemModel } from '../../shared/models/invoice-item.model';
import { InvoiceItemsRequest, InvoiceItemsRequestReset } from '../requests/invoice-items/invoice-items-request.action';

import {
  FetchInvoiceItems,
  FetchInvoiceItemsSuccess,
  ResetInvoiceItems,
} from './invoice-items.actions';

export class InvoiceItemsStateModel {
  entities: { [ids: string]: InvoiceItemModel };
  collectionIds: string[];
}

@State<InvoiceItemsStateModel>({
  name: 'invoiceItems',
  defaults: {
    entities: null,
    collectionIds: null,
  }
})
export class InvoiceItemsState {

  @Selector()
  static getInvoiceItems(state: InvoiceItemsStateModel) {
    return state.collectionIds.map(id => state.entities[id]);
  }

 // @Selector()
 // static getProductIds(state: InvoiceItemsStateModel) {
 //   return state.collectionIds.map(id => state.entities[id].product_id);
 // }

  @Action(FetchInvoiceItems)
  fetchInvoiceItems({dispatch}: StateContext<InvoiceItemsStateModel>, {payload: id}: FetchInvoiceItems) {
    dispatch(new InvoiceItemsRequest(id));
  }

  @Action(FetchInvoiceItemsSuccess)
  fetchInvoiceItemsSuccess(
    {setState}: StateContext<InvoiceItemsStateModel>,
    {payload: custom}: FetchInvoiceItemsSuccess
  ) {
    setState({
      entities: custom.reduce((acc, item) => ({
        ...acc,
        [item._id]: item
      }), {}),
      collectionIds: custom.map(item => item._id)
    });
  }




  @Action(ResetInvoiceItems)
  resetInvoiceItems(
    {setState, dispatch}: StateContext<InvoiceItemsStateModel>,
  ) {
   setState({
     entities: null,
     collectionIds: null
    });
    dispatch(new InvoiceItemsRequestReset());
  }
}

