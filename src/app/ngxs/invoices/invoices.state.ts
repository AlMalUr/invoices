import { Action, Selector, State, StateContext } from '@ngxs/store';

import { InvoiceModel } from '../../shared/models/invoice.model';
import { InvoicesRequest } from '../requests/invoices/invoices-request.action';

import {
  FetchInvoices,
  FetchInvoicesSuccess, FetchSelectedInvoice,
} from './invoices.actions';

export class InvoicesStateModel {
  entities: { [ids: string]: InvoiceModel };
  collectionIds: string[];
  selectedInvoice;
}

@State<InvoicesStateModel>({
  name: 'invoices',
  defaults: {
    entities: {},
    collectionIds: [],
    selectedInvoice: null,
  }
})
export class InvoicesState {

  @Selector()
  static getInvoices(state: InvoicesStateModel) {
    return state.collectionIds.map(id => state.entities[id]);
  }

  @Selector()
  static getCustomerId(state: InvoicesStateModel) {
    return state.selectedInvoice.customer_id;
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
      collectionIds: inv.map(item => item._id),
      selectedInvoice: null
    });
  }

  @Action(FetchSelectedInvoice)
  fetchSelectedInvoice (
    {patchState, getState}: StateContext<InvoicesStateModel>,
    {payload: id}: FetchSelectedInvoice
  ) {

    patchState({
      selectedInvoice: getState().entities[id]
    });
  }
}

