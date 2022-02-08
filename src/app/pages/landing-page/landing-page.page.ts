import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from "../../services/login.service";
import { Trainer } from "../../models/pokemon.model";
import { environment } from "../../../environments/environment";
import { RegisterService } from "../../services/register.service";
import { NgForm } from '@angular/forms';

const { pokemonTrainer } = environment;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.css']
})

export class LandingPagePage implements OnInit {
  public username: string = '';

  //--- inject requeired services
  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
    private registerService: RegisterService) {  }

  ngOnInit(): void {
    
  }

  // GETTERS
  get trainer(): Trainer | undefined {
    return this.loginService.trainer;
  }
  
  get error(): string {
    return this.loginService.getError();
  }
  
  /**
   * handles click on Login Button
   * @param form 
   */
  public onLoginClick(form: NgForm): any {
    this.username = form.value.username;
    this.loginService.login(this.username);
  } 
  
  // Helper
  asJSON(val: any) {
    return JSON.stringify(val);
  }
}

