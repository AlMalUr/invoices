import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { InvoiceModel } from '../../core/models/models';
import { InvoicesRequestService } from '../../core/services/invoices-services/invoices-request.service';

import * as InvoicesActions from './invoices.actions';

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

  constructor(
    private invoicesRequestService: InvoicesRequestService
  ) {
  }

  @Selector()
  static getInvoices(state: InvoicesStateModel) {
    return state.invoicesIds.map(id => state.invoices[id]);
  }
  @Selector()
    static getInvoicesCount(state: InvoicesStateModel) {
      return state.invoicesIds.length;
  }

  @Action(InvoicesActions.FetchInvoices)
  fetchInvoices({dispatch}: StateContext<InvoicesStateModel>) {
    return this.invoicesRequestService
    .fetchInvoices()
    .pipe(
      tap((invoices: InvoiceModel[]) => {
        dispatch(new InvoicesActions.FetchInvoicesSuccess(invoices));
      }),
      catchError(error =>
        dispatch(new InvoicesActions.FetchInvoicesFailed(error))
      )
    );
  }

  @Action(InvoicesActions.FetchInvoicesSuccess)
  fetchInvoicesSuccess(
    {setState}: StateContext<InvoicesStateModel>,
    {payload: inv}: InvoicesActions.FetchInvoicesSuccess
  ) {
    setState({
      invoices: inv.reduce((acc, item) => ({
        ...acc,
        [item._id]: item
      }), {}),
      invoicesIds: inv.map(item => item._id)
    });
  }


  @Action(InvoicesActions.FetchInvoicesFailed)
  sharedInvoicesFailed(
    {dispatch}: StateContext<InvoiceModel>,
    {payload: error}: InvoicesActions.FetchInvoicesFailed
  ) {
    dispatch(
      console.error('An error occured: ', error.message)
    );
  }

}


// _id: string = null;
// name: string = null;
// price: number = null;
