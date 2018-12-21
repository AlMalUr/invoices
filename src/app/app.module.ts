import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './core/interceptors';
import { HeaderComponent } from './header/header.component';
import { CustomersState } from './ngxs/customers/customers.state';
import { InvoicesState } from './ngxs/invoices/invoices.state';
import { ProductsState } from './ngxs/products/products.state';
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
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
