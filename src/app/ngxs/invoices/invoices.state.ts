import { Router } from '@angular/router';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { InvoiceModel } from '../../shared/models/invoice.model';
import { SaveNewInvoiceItems, PostInvoiceItems } from '../invoice-items/invoice-items.actions';
import { GetInvoiceRequest, GetInvoiceRequestReset } from '../requests/invoice/invoice-get-request.action';
import { PostInvoiceRequest } from '../requests/invoice/invoice-post-request.action';
import { InvoicesRequest } from '../requests/invoices/invoices-request.action';

import {
  CreateInvoice, CreateInvoiceSuccess,
  FetchInvoice,
  FetchInvoices,
  FetchInvoicesSuccess,
  FetchInvoiceSuccess,
  ResetInvoice,
  UpdateInvoices,
} from './invoices.actions';
import { Navigate } from '@ngxs/router-plugin';


export class InvoicesStateModel {
  entities: { [ids: string]: InvoiceModel };
  collectionIds: string[];
  invoice: InvoiceModel;
}

@State<InvoicesStateModel>({
  name: 'invoices',
  defaults: {
    entities: {},
    collectionIds: null,
    invoice: null
  }
})
export class InvoicesState {

  constructor(private router: Router) {
  }

  @Selector()
  static getInvoices(state: InvoicesStateModel) {
    return state.collectionIds.map(id => state.entities[id]);
  }

  @Selector()
  static getInvoice(state: InvoicesStateModel) {
    return state.invoice;
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
    return setState({
      entities: inv.reduce((acc, item) => ({
        ...acc,
        [item._id]: item
      }), {}),
      collectionIds: inv.map(item => item._id),
      invoice: null
    });
  }

  @Action(UpdateInvoices)
  updateInvoices(
    {getState, patchState, dispatch}: StateContext<InvoicesStateModel>,
    {payload: newInvoice}: UpdateInvoices
  ) {
    const {entities, collectionIds} = getState();
    patchState({
      entities: {
        ...entities,
        [newInvoice._id]: newInvoice
      },
      collectionIds: [
        ...collectionIds,
        newInvoice._id
      ],
    });
    return dispatch(new Navigate(['/invoices']));
  }

  @Action(FetchInvoice)
  fetchInvoice(
    {dispatch}: StateContext<InvoicesStateModel>,
    {payload: id}: FetchInvoice
  ) {
   return dispatch(new GetInvoiceRequest(id));
  }

  @Action(FetchInvoiceSuccess)
  fetchInvoiceSuccess(
    {patchState, getState}: StateContext<InvoicesStateModel>,
    {payload}: FetchInvoiceSuccess
  ) {
    return patchState({
      invoice: payload
    });
  }

  @Action(ResetInvoice)
  resetInvoice(
    {patchState, getState, dispatch}: StateContext<InvoicesStateModel>,
  ) {
    patchState({
      invoice: null
    });
    return dispatch(new GetInvoiceRequestReset());
  }

  @Action(CreateInvoice)
  createInvoice(
    {dispatch}: StateContext<InvoicesStateModel>,
    {payload: newInvoice}: CreateInvoice
  ) {
    return dispatch([
      new SaveNewInvoiceItems(newInvoice.items),
      new PostInvoiceRequest(newInvoice)]
    );
  }

  @Action(CreateInvoiceSuccess)
  createInvoiceSuccess(
    {dispatch}: StateContext<InvoicesStateModel>,
    {payload}: CreateInvoiceSuccess
  ) {
    return dispatch([
      new UpdateInvoices(payload),
      new PostInvoiceItems(payload._id)
    ]);
  }

}
