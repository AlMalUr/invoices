import { NgModule } from '@angular/core';

import { httpInterceptorProviders } from './interceptors';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    httpInterceptorProviders
  ],
})
export class CoreModule { }
