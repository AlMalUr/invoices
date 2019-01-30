import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ModalWindowComponent } from '../../modal-window/modal-window.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private dialog: MatDialog
  ) {}

  confirmModal() {
    return this.dialog.open(
      ModalWindowComponent)
    .afterClosed();
  }
}



