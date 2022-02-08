import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { environment } from '../../environments/environment'

const { pokemonTrainer: pokemonSessionKeyUser } = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(
    private router: Router
  ) { }

  /**
   * redirects a user back to the Landing page 
   * if they do not have a Trainer name stored in localStorage
   * @returns true, if trainer exists in localStorage otherwise false
   */
  canActivate() {
      //console.log("LoginGuardService is active...");
      const trainer = localStorage.getItem(pokemonSessionKeyUser);
      const result = trainer !== undefined && trainer !== null && trainer !== ""
      if(!result) {
        this.router.navigateByUrl("/login");
      }
      return result;
  }
}
