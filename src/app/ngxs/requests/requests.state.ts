import { Selector, State } from '@ngxs/store';
import { CustomersRequestState } from './customers/customers-request.state';
import { IRequest } from './requests.interface';

export interface RequestsStateModel{
}

@State<RequestsStateModel>({
  name: 'requests',
  defaults: {},
  children: [
    CustomersRequestState
  ]
})
export class RequestsState {
  @Selector([
    CustomersRequestState
  ])
  static loadingStatus(...states: IRequest[]): boolean {
    return states
      .filter((state) => {
        return state && state.hasOwnProperty('loading') && state.loading;
      })
      .length > 0;
  }
}
