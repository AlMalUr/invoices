import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { InvoiceNewComponent } from '../invoices/invoice-new/invoice-new.component';


@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent {

  leavePageModal: boolean;
  constructor(
    public dialogRef: MatDialogRef<InvoiceNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
   // this.leavePageModal = this.data.leavePageModal;
  }

  leaveOrNot(value): void {
    this.dialogRef.close(value);
  }

}
