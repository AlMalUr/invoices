import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatTabsModule, MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [,
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  declarations: []
})
export class SharedModule { }
