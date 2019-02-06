import { Router } from '@angular/router';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { InvoiceModel } from '../../shared/models/invoice.model';
import { GetInvoiceRequest, GetInvoiceRequestReset } from '../requests/invoice/invoice-get-request.action';
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
import { PostInvoiceRequest } from '../requests/invoice/invoice-post-request.action';


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

  constructor(private router: Router) {}

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
    setState({
      entities: inv.reduce((acc, item) => ({
        ...acc,
        [item._id]: item
      }), {}),
      collectionIds: inv.map(item => item._id),
      invoice: null
    });
  }

  @Action(UpdateInvoices)
  updateInvoices({getState, patchState}: StateContext<InvoicesStateModel>, {payload: newInvoice}: UpdateInvoices) {
    patchState({
      entities: {...getState().entities, [newInvoice._id]: newInvoice},
      collectionIds: [...getState().collectionIds, newInvoice._id],
    });
    this.router.navigate(['/invoices']);
  }

  // invoice get & reset

  @Action(FetchInvoice)
  fetchInvoice({dispatch}: StateContext<InvoicesStateModel>, {payload: id}: FetchInvoice) {
    dispatch(new GetInvoiceRequest(id));
  }

  @Action(FetchInvoiceSuccess)
  fetchInvoiceSuccess(
    {patchState, getState}: StateContext<InvoicesStateModel>,
    {payload}: FetchInvoiceSuccess
  ) {
    patchState({
      ...getState(),
      invoice: payload
    });
  }


  @Action(ResetInvoice)
  resetInvoice(
    {patchState, getState, dispatch}: StateContext<InvoicesStateModel>,
  ) {
    patchState({
      ...getState(),
      invoice: null
    });
    dispatch(new GetInvoiceRequestReset());
  }

  // invoice create

  @Action(CreateInvoice)
  createInvoice({dispatch}: StateContext<InvoicesStateModel>, {payload: newInvoice}: CreateInvoice) {
    dispatch(new PostInvoiceRequest(newInvoice));
  }

  @Action(CreateInvoiceSuccess)
  createInvoiceSuccess(
    {dispatch}: StateContext<InvoicesStateModel>,
    {payload}: CreateInvoiceSuccess
  ) {
    dispatch(new UpdateInvoices(payload));
  }

}
