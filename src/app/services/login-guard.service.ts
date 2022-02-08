import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { environment } from '../../environments/environment'

const { pokemonTrainer } = environment;

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
      console.log("LoginGuardService is active...");
      const trainer = localStorage.getItem(pokemonTrainer);
      console.log(`[canActivate] trainer: ${trainer}`);
      //--- check localStorage whether user has logged in (trainer object is present)
      const result = trainer !== undefined && trainer !== null && trainer !== ""
      if(!result) {
        this.router.navigateByUrl("/login");
      }
      console.log(`[canActivate] result: ${result}`);
      return result;
  }
}
