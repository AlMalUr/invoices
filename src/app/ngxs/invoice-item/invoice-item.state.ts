import { Action, Selector, State, StateContext } from '@ngxs/store';

import { CustomerItemRequest, InvoiceItemRequest, InvoiceItemRequestReset } from '../requests/invoice-item/invoice-item-request.action';

import {
  FetchCustomerItem,
  FetchCustomerItemSuccess,
  FetchInvoiceItem,
  FetchInvoiceItemSuccess,
  ResetInvoiceItem,
} from './invoice-item.actions';
import { InvoiceModel } from '../../shared/models/invoice.model';
import { InvoiceItemModel } from '../../shared/models/invoice-item.model';

export class InvoiceItemStateModel {
  entity: InvoiceModel;
  customer_name: string;
}

@State<InvoiceItemStateModel>({
  name: 'invoiceItem',
  defaults: {
    entity: null,
    customer_name: ''
  }
})
export class InvoiceItemState {

  @Selector()
  static getInvoiceItem(state: InvoiceItemStateModel) {
    return state.entity;
  }

  @Action(FetchInvoiceItem)
  fetchInvoiceItem({dispatch}: StateContext<InvoiceItemStateModel>, {payload: id}: FetchInvoiceItem) {
    dispatch(new InvoiceItemRequest(id));
  }

  @Action(FetchInvoiceItemSuccess)
  fetchInvoiceItemSuccess(
    {patchState, dispatch, getState}: StateContext<InvoiceItemStateModel>,
    {payload}: FetchInvoiceItemSuccess
  ) {
   // console.log(payload);
    patchState({
      entity: payload
    });
   dispatch(new FetchCustomerItem(getState().entity.customer_id));
    //console.log(getState().entity.customer_id);
  }

  @Action(ResetInvoiceItem)
  resetInvoiceItem(
    {setState, dispatch}: StateContext<InvoiceItemStateModel>,
  ) {
    setState({
      entity: null,
      customer_name: ''
    });
    dispatch(new InvoiceItemRequestReset());
  }

  @Action(FetchCustomerItem)
  fetchCustomerItem({dispatch}: StateContext<InvoiceItemStateModel>, {payload}: FetchCustomerItem) {
    dispatch(new CustomerItemRequest(payload));
  }

  @Action(FetchCustomerItemSuccess)
  fetchCustomerItemSuccess(
    {patchState, getState}: StateContext<InvoiceItemStateModel>,
    {payload}: FetchCustomerItemSuccess
  ) {
    const state = getState()
    patchState({
      customer_name: payload.name
    });
  }

}

