import { Action, Selector, State, StateContext } from '@ngxs/store';

import { InvoiceModel } from '../../shared/models/invoice.model';
import { InvoiceRequest, InvoiceRequestReset } from '../requests/invoice/invoice-request.action';

import {
  FetchInvoice,
  FetchInvoiceSuccess,
  ResetInvoice,
} from './invoice.actions';

export class InvoiceStateModel {
  entities: {[ids: string]: InvoiceModel};
  collectionIds: string[];
}

@State<InvoiceStateModel>({
  name: 'invoice',
  defaults: {
    entities: null,
    collectionIds: null,
  }
})
export class InvoiceState {

  @Selector()
  static getInvoice(state: InvoiceStateModel) {
    return state.collectionIds.map(id => state.entities[id]);
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
    setState({
      entities: {[payload._id]: payload},
      collectionIds: [].concat(payload._id)
    });
  }


  @Action(ResetInvoice)
  resetInvoice(
    {setState, dispatch}: StateContext<InvoiceStateModel>,
  ) {
    setState({
      entities: null,
      collectionIds: null
    });
    dispatch(new InvoiceRequestReset());
  }
}

