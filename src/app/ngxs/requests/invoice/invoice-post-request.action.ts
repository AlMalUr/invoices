import { HttpErrorResponse } from '@angular/common/http';


export class PostInvoiceRequest {
  static type = '[PostInvoiceRequest] PostInvoiceRequest';
  constructor(public payload: string) {
  }
}

export class PostInvoiceRequestSuccess {
  static type = '[PostInvoiceRequest] PostInvoiceRequestSuccess';

  constructor(public payload: any) {
  }
}

export class PostInvoiceRequestFail {
  static type = '[PostInvoiceRequest] PostInvoiceRequestFailed';

  constructor(public payload: HttpErrorResponse) {
  }
}
