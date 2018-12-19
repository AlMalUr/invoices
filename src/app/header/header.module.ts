import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    HeaderRoutingModule,
    MatToolbarModule
  ],
  declarations: [HeaderComponent]
})
export class HeaderModule { }
