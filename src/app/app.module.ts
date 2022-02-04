import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPagePage } from './pages/landing-page/landing-page.page';
import { TrainerPagePage } from './pages/trainer-page/trainer-page.page';
import { CataloguePagePage } from './pages/catalogue-page/catalogue-page.page';

@NgModule({
  declarations: [
    AppComponent,
    LandingPagePage,
    TrainerPagePage,
    CataloguePagePage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
