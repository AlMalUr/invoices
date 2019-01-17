import { Action, Selector, State, StateContext } from '@ngxs/store';

import { InvoiceModel } from '../../shared/models/invoice.model';
import { InvoicesRequest } from '../requests/invoices/invoices-request.action';

import {
  FetchInvoices,
  FetchInvoicesSuccess,
} from './invoices.actions';

export class InvoicesStateModel {
  invoices: { [ids: string]: InvoiceModel };
  invoicesIds: string[];
}

@State<InvoicesStateModel>({
  name: 'invoices',
  defaults: {
    invoices: {},
    invoicesIds: []
  }
})
export class InvoicesState {

  @Selector()
  static getInvoices(state: InvoicesStateModel) {
    return state.invoicesIds.map(id => state.invoices[id]);
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
      invoices: inv.reduce((acc, item) => ({
        ...acc,
        [item._id]: item
      }), {}),
      invoicesIds: inv.map(item => item._id)
    });
  }
}

