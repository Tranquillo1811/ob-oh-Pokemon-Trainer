import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.css']
})

export class LandingPagePage implements OnInit {
  public username: string = '';

  constructor(private readonly loginService: LoginService) {}

  ngOnInit(): void {
    
  }

  // Event handler
  public onLoginClick(): any {
    this.loginService.loginUser(this.username);
  } 
  
  public onSaveClick(): any {
    console.log(this.loginService.getTrainer());
  }  
}
