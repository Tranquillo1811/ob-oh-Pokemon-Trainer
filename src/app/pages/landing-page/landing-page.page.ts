import { Component, OnInit, EventEmitter, OnDestroy, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';

import { LoginService } from '../../services/login.service';
import { Trainer } from '../../models/pokemon.model';
import { environment } from '../../../environments/environment'
import { TrainerPagePage } from '../trainer-page/trainer-page.page';

const {pokemonSessionKeyUser} = environment;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.css']
})

export class LandingPagePage implements OnInit {
  // Communication
  @Output() successful: EventEmitter<Trainer> = new EventEmitter<Trainer>();

  public username: string = '';

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router) 
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
  get trainer(): Trainer {
    return this.loginService.getTrainer() as Trainer;
  }
  
  get error(): string {
    return this.loginService.getError();
  }
  
  // Event handler
  public onLoginClick(): any {
    this.loginService.login(this.username);
  } 
  
  public onSaveClick(): any {
    if (this.trainer !== null && this.trainer !== undefined){
      localStorage.setItem(pokemonSessionKeyUser, this.asJSON(this.trainer));

      return this.router.navigate(['catalogue']);
    }
  }
  
  // Helper
  asJSON(val: any) {
    return JSON.stringify(val);
  }
}

