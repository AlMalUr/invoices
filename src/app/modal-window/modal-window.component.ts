import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { InvoiceNewComponent } from '../invoices/invoice-new/invoice-new.component';


@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent {

  constructor(
    public dialogRef: MatDialogRef<InvoiceNewComponent>
  ) {
  }

  leaveOrNot(value): void {
    this.dialogRef.close(value);
  }

}
