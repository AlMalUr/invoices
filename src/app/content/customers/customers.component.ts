import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CustomerModel } from '../../core/models/models';
import { CustomersService } from '../../core/services/customers-services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers$: Observable<CustomerModel[]>;

  displayedColumns: string[] = ['number', 'customerName', 'address', 'phone'];

  constructor(private customersService: CustomersService) {
  }

  ngOnInit() {
    this.customers$ = this.customersService.customers$;
  }

}
