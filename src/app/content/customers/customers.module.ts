import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';

@NgModule({
  imports: [
    CustomersRoutingModule,
    SharedModule
  ],
  declarations: [CustomersComponent]
})
export class CustomersModule { }
