import { Action, Selector, State, StateContext } from '@ngxs/store';

import { InvoiceModel } from '../../shared/models/invoice.model';
import { InvoiceRequest, InvoiceRequestReset } from '../requests/invoice/invoice-request.action';

import {
  FetchInvoice,
  FetchInvoiceSuccess,
  ResetInvoice,
} from './invoice.actions';

const entityDefault = {
  invoice: null
};

export class InvoiceStateModel {
  invoice: InvoiceModel;
}

@State<InvoiceStateModel>({
  name: 'invoice',
  defaults: entityDefault
})
export class InvoiceState {

  @Selector()
  static getInvoice(state: InvoiceStateModel) {
    return state.invoice;
  }

  @Action(FetchInvoice)
  fetchInvoice({dispatch}: StateContext<InvoiceStateModel>, {payload: id}: FetchInvoice) {
    dispatch(new InvoiceRequest(id));
  }

  @Action(FetchInvoiceSuccess)
  fetchInvoiceSuccess(
    {setState}: StateContext<InvoiceStateModel>,
    {payload}: FetchInvoiceSuccess
  ) {
    setState({invoice: payload});
  }


  @Action(ResetInvoice)
  resetInvoice(
    {setState, dispatch}: StateContext<InvoiceStateModel>,
  ) {
    setState(entityDefault);
    dispatch(new InvoiceRequestReset());
  }
}

