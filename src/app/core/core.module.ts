import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { httpInterceptorProviders } from './interceptors';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    httpInterceptorProviders
  ],
})
export class CoreModule { }
