import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment'

const {pokemonSessionKeyUser} = environment;

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.page.html',
  styleUrls: ['./trainer-page.page.css']
})
export class TrainerPagePage implements OnInit {

  constructor(private readonly router: Router) 
  { 
    const data = localStorage.getItem(pokemonSessionKeyUser);

    if (data === null || data === 'undefined') {
      this.router.navigate(['/login']);
    }    
  }

  ngOnInit(): void {
  }

}
