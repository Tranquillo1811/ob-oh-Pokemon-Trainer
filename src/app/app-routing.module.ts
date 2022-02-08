import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

/*
  Module Dependencies
*/
import { LandingPagePage } from './pages/landing-page/landing-page.page';
import { TrainerPagePage } from './pages/trainer-page/trainer-page.page';
import { CataloguePagePage } from './pages/catalogue-page/catalogue-page.page';
import { LoginGuardService } from './services/login-guard.service';

const routes: Routes = [
  {
    path: "",
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: "login",
    component: LandingPagePage
  },
  {
    path: "trainer",
    component: TrainerPagePage,
    //--- only accessible when user has logged in
    canActivate: [LoginGuardService]
  },
  {
    path: "catalogue",
    component: CataloguePagePage,
    //--- only accessible when user has logged in
    canActivate: [LoginGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
