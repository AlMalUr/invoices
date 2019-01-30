import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HeaderModule } from './header/header.module';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { NgxsStateModule } from './ngxs/ngxs-state.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    ModalWindowComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({appId: 'invoice-app'}),
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HeaderModule,
    NgxsStateModule,
    TransferHttpCacheModule,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalWindowComponent],
})
export class AppModule { }
