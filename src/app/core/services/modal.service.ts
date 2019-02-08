import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ModalWindowComponent } from '../../modal-window/modal-window.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private dialog: MatDialog
  ) {}

  confirmModal(): Observable<boolean> {
    return this.dialog.open(ModalWindowComponent, {
      width: '350px'
    })
    .afterClosed();
  }
}



