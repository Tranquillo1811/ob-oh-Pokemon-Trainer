import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { environment } from "../environments/environment";

const {pokemonSessionKeyUser} = environment;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'ng-ob-oh-pokemon-trainer';

  constructor(private readonly router: Router) {
  }

  ngOnInit(): void {
      
  }

  public onTrainerPageClick(): any {
    return this.router.navigate(["trainer"]);
  }

  public onCataloguePageClick(): any {
    return this.router.navigate(["catalogue"]);
  }

  public onLogoutClick(): any {
    localStorage.removeItem(pokemonSessionKeyUser)

    return this.router.navigate(["login"]);
  }
}
