import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { HeaderRoutingModule } from './header-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HeaderRoutingModule,
  ],
  declarations: []
})
export class HeaderModule { }
