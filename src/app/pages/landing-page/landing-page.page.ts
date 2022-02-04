import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';

import { LoginService } from '../../services/login.service';
import { Trainer } from '../../models/pokemon.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.css']
})

export class LandingPagePage implements OnInit {
  public username: string = '';

  constructor(private readonly loginService: LoginService,
    private readonly router: Router) {}

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
  }  

  public onNavToTrainerClick(): any {
    // return this.router.navigate(['trainer']);
  }
}
