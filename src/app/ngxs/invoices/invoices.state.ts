import { Action, Selector, State, StateContext } from '@ngxs/store';

import { InvoiceModel } from '../../shared/models/invoice.model';
import { InvoiceItemsStateModel } from '../invoice-items/invoice-items.state';
import { InvoicesRequest } from '../requests/invoices/invoices-request.action';

import {
  AddInvoice,
  FetchInvoices,
  FetchInvoicesSuccess
} from './invoices.actions';

export class InvoicesStateModel {
  entities: { [ids: string]: InvoiceModel };
  collectionIds: string[];
}

@State<InvoicesStateModel>({
  name: 'invoices',
  defaults: {
    entities: {},
    collectionIds: null
  }
})
export class InvoicesState {

  @Selector()
  static getInvoices(state: InvoicesStateModel) {
    return state.collectionIds.map(id => state.entities[id]);
  }

  @Action(FetchInvoices)
  fetchInvoices({dispatch}: StateContext<InvoicesStateModel>) {
    dispatch(new InvoicesRequest);
  }

  @Action(FetchInvoicesSuccess)
  fetchInvoicesSuccess(
    {setState}: StateContext<InvoicesStateModel>,
    {payload: inv}: FetchInvoicesSuccess
  ) {
    setState({
      entities: inv.reduce((acc, item) => ({
        ...acc,
        [item._id]: item
      }), {}),
      collectionIds: inv.map(item => item._id)
    });
  }


  @Action(AddInvoice)
  addInvoice(
    {patchState, getState}: StateContext<InvoiceItemsStateModel>,
    {payload: newInvoice}: AddInvoice
  ) {
    const state = getState();
    patchState({
      entities: {
        ...state.entities,
        [newInvoice._id]: {
          _id: newInvoice._id,
          customer_id: newInvoice.customer._id,
          discount: newInvoice.discount,
          total: newInvoice.total
        }
      },
      collectionIds: [...state.collectionIds, newInvoice._id]
    });
  }
}

