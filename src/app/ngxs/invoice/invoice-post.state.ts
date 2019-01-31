import { Action, State, StateContext } from '@ngxs/store';

import { UpdateInvoices } from '../invoices/invoices.actions';
import { InvoicePostRequest } from '../requests/invoice/invoice-post-request.action';

import {
  PostInvoice,
  PostInvoiceSuccess,
} from './invoice-post.actions';

const entityDefault = {
  invoice: null
};

export class PostInvoiceStateModel {
  invoice: {};
}

@State<PostInvoiceStateModel>({
  name: 'postInvoice',
  defaults: entityDefault
})
export class PostInvoiceState {


  @Action(PostInvoice)
  fetchInvoice({dispatch}: StateContext<PostInvoiceStateModel>, {payload: newInvoice}: PostInvoice) {
    dispatch(new InvoicePostRequest(newInvoice));
  }

  @Action(PostInvoiceSuccess)
  fetchInvoiceSuccess(
    {dispatch}: StateContext<PostInvoiceStateModel>,
    {payload}: PostInvoiceSuccess
  ) {
    dispatch(new UpdateInvoices(payload));
  }

}
