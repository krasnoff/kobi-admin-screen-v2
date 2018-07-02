import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AppComponent } from './app.component';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { GlobalDataService } from './global-data.service';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(routes)
  ],
  providers: [GlobalDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
