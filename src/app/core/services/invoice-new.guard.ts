import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';

import { InvoiceNewComponent } from '../../invoices/invoice-new/invoice-new.component';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InvoiceNewGuard implements CanDeactivate<InvoiceNewComponent> {
  canDeactivate(
    component: InvoiceNewComponent ,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}


