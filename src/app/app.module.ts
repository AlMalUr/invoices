import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { ProductsState } from './ngxs/products/products.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { HttpClientModule } from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { CustomersState } from './ngxs/customers/customers.state';
import { InvoicesState } from './ngxs/invoices/invoices.state';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({appId: 'invoice-app'}),
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule.forRoot([ProductsState, CustomersState, InvoicesState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    TransferHttpCacheModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
