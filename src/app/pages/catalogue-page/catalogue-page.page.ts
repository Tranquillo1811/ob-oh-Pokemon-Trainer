import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment'

const {pokemonSessionKeyUser} = environment;

@Component({
  selector: 'app-catalogue-page',
  templateUrl: './catalogue-page.page.html',
  styleUrls: ['./catalogue-page.page.css']
})

export class CataloguePagePage implements OnInit {

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
