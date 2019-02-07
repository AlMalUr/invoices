import { Action, Selector, State, StateContext } from '@ngxs/store';

import { InvoiceItemModel } from '../../shared/models/invoice-item.model';
import { InvoiceItemsPostRequest } from '../requests/invoice-items/invoice-items-post-request.action';
import { InvoiceItemsRequest, InvoiceItemsRequestReset } from '../requests/invoice-items/invoice-items-request.action';

import {
  FetchInvoiceItems,
  FetchInvoiceItemsSuccess,
  PostInvoiceItems,
  ResetInvoiceItems,
  SaveNewInvoiceItems,
} from './invoice-items.actions';

const entitiesDefault = {
  entities: null,
  collectionIds: null,
  newItems: null,
};

export class InvoiceItemsStateModel {
  entities: { [ids: string]: InvoiceItemModel };
  collectionIds: string[];
  newItems: InvoiceItemModel[];
}

@State<InvoiceItemsStateModel>({
  name: 'invoiceItems',
  defaults: entitiesDefault
})
export class InvoiceItemsState {

  @Selector()
  static getInvoiceItems(state: InvoiceItemsStateModel) {
    return state.collectionIds.map(id => state.entities[id]);
  }

  @Selector()
  static getNewItems(state: InvoiceItemsStateModel) {
    return state.newItems;
  }

  @Action(FetchInvoiceItems)
  fetchInvoiceItems(
    { dispatch }: StateContext<InvoiceItemsStateModel>,
    { payload: id }: FetchInvoiceItems
  ) {
    return dispatch(new InvoiceItemsRequest(id));
  }

  @Action(FetchInvoiceItemsSuccess)
  fetchInvoiceItemsSuccess(
    { setState }: StateContext<InvoiceItemsStateModel>,
    { payload: custom }: FetchInvoiceItemsSuccess
  ) {
    return setState({
      entities: custom.reduce((acc, item) => ({
        ...acc,
        [item._id]: item
      }), {}),
      collectionIds: custom.map(item => item._id),
      newItems: null
    });
  }

  @Action(ResetInvoiceItems)
  resetInvoiceItems(
    { setState, dispatch }: StateContext<InvoiceItemsStateModel>,
  ) {
    setState(entitiesDefault);
    return dispatch(new InvoiceItemsRequestReset());
  }

  @Action(SaveNewInvoiceItems)
  createInvoiceItems(
    { patchState }: StateContext<InvoiceItemsStateModel>,
    { payload }: SaveNewInvoiceItems
  ) {
    return patchState({
      newItems: payload
    });
  }

  @Action(PostInvoiceItems)
  postInvoiceItems(
    { dispatch, getState }: StateContext<InvoiceItemsStateModel>,
    { payload }: PostInvoiceItems) {
    return dispatch(new InvoiceItemsPostRequest(payload));
  }
}


