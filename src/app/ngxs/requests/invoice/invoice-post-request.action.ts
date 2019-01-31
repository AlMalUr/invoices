import { HttpErrorResponse } from '@angular/common/http';


export class InvoicePostRequest {
  static type = '[InvoicePostRequest] InvoicePostRequest';
  constructor(public payload: string) {
  }
}

export class InvoicePostRequestSuccess {
  static type = '[InvoicePostRequest] InvoicePostRequestSuccess';

  constructor(public payload: any) {
  }
}

export class InvoicePostRequestFail {
  static type = '[InvoicePostRequest] InvoicePostRequestFailed';

  constructor(public payload: HttpErrorResponse) {
  }
}
