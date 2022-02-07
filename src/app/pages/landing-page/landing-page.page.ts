import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from "../../services/login.service";
import { Trainer } from "../../models/pokemon.model";
import { environment } from "../../../environments/environment";
import { RegisterService } from "../../services/register.service";
import { NgForm } from '@angular/forms';

const {pokemonSessionKeyUser} = environment;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.css']
})

export class LandingPagePage implements OnInit {
  
  public username: string = '';

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
    private registerService: RegisterService) 
    {
      const data = localStorage.getItem(pokemonSessionKeyUser);

      if (data && data !== 'undefined') {
        console.log(JSON.parse(data));

        const _trainer: Trainer = JSON.parse(data);
        // this.successful.emit(_trainer);

        this.router.navigate(['catalogue']);
      }
    }

  ngOnInit(): void {
    
  }

  // GETTERS
  get trainer(): Trainer | undefined {
    return this.loginService.Trainer;
  }
  
  get error(): string {
    return this.loginService.getError();
  }
  
  // Event handler
  public onLoginClick(form: NgForm): any {
    this.username = form.value.username;
    this.loginService.login(this.username);
  } 
  
  public onSaveClick(form: NgForm): any {
    this.username = form.value.username;
    if (this.trainer === null || this.trainer === undefined){
      localStorage.setItem(pokemonSessionKeyUser, this.asJSON(this.trainer));
      
      console.log(`registering new user: ${this.username}`);
      this.registerService.register(this.username)
        .subscribe({
          next: (response: any) => {
            console.log("Register: " + response);
          }
        })

      // return this.router.navigate(['catalogue']);
    }
  }
  
  // Helper
  asJSON(val: any) {
    return JSON.stringify(val);
  }
}

