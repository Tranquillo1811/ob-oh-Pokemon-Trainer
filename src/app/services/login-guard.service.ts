import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { LoginService } from './login.service';
import { environment } from '../../environments/environment'
import { trigger } from '@angular/animations';

const { pokemonSessionKeyUser } = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate() {
      console.log("LoginGuardService is active...");
      const trainer = localStorage.getItem(pokemonSessionKeyUser);
      const result = trainer !== undefined && trainer !== null && trainer !== ""
      if(!result) {
        this.router.navigateByUrl("/login");
      }
      return result;
  }
}
