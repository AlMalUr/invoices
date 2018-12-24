import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HeaderModule } from './header/header.module';
import { NgxsStateModule } from './ngxs/ngxs-state.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({appId: 'invoice-app'}),
    BrowserAnimationsModule,
    CoreModule,
    HeaderModule,
    NgxsStateModule,
    TransferHttpCacheModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
