import { Action, State, StateContext } from '@ngxs/store';

import { InvoiceItemModel } from '../../shared/models/invoice-item.model';
import { InvoiceItemsPostRequest } from '../requests/invoice-items/invoice-items-post-request.action';


import {
  PostInvoiceItems,
  PostInvoiceItemsSuccess,
} from './invoice-items-post.actions';

const entitiesDefault = {
  entities: null,
  collectionIds: null
};

export class PostInvoiceItemsStateModel {
  entities: { [ids: string]: InvoiceItemModel };
  collectionIds: string[];
}

@State<PostInvoiceItemsStateModel>({
  name: 'postInvoiceItems',
  defaults: entitiesDefault
})
export class PostInvoiceItemsState {

  @Action(PostInvoiceItems)
  postInvoiceItems({dispatch}: StateContext<PostInvoiceItemsStateModel>, {id, items}: PostInvoiceItems) {
    dispatch(new InvoiceItemsPostRequest(id, items));
  }

  @Action(PostInvoiceItemsSuccess)
  postInvoiceItemsSuccess(
    {setState}: StateContext<PostInvoiceItemsStateModel>,
    {payload: custom}: PostInvoiceItemsSuccess
  ) {
    setState({
      entities: custom.reduce((acc, item) => ({
        ...acc,
        [item._id]: item
      }), {}),
      collectionIds: custom.map(item => item._id)
    });
  }

}
