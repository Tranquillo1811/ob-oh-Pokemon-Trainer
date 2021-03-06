import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPagePage } from './pages/landing-page/landing-page.page';
import { TrainerPagePage } from './pages/trainer-page/trainer-page.page';
import { CataloguePagePage } from './pages/catalogue-page/catalogue-page.page';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonListItemComponent } from './components/pokemon-list-item/pokemon-list-item.component';
import { LoginGuardService } from './services/login-guard.service';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { PokemonTrainerService } from './services/pokemon-trainer.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingPagePage,
    TrainerPagePage,
    CataloguePagePage,
    PokemonListComponent,
    PokemonListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [LoginGuardService, LoginService, RegisterService, PokemonTrainerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
