import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header.component';
import { MatButtonModule, MatToolbar, MatToolbarModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    HeaderRoutingModule,
    MatToolbar
  ],
  declarations: [HeaderComponent]
})
export class HeaderModule { }
