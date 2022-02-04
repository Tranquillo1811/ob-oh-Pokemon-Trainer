import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*
  Module Dependencies
*/
import { LandingPagePage } from './pages/landing-page/landing-page.page';
import { TrainerPagePage } from './pages/trainer-page/trainer-page.page';
import { CataloguePagePage } from './pages/catalogue-page/catalogue-page.page';

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
    component: TrainerPagePage
  },
  {
    path: "catalogue",
    component: CataloguePagePage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
