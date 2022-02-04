import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment'
import { Trainer } from '../models/pokemon.model';

const {pokemonApiBaseUrl} = environment;

@Injectable({
    providedIn: 'root'
  })

export class LoginService {
    private _user: Trainer[] = [];
    private _error: string = '';
    constructor(private readonly http: HttpClient) { }

    public loginUser(username: string): any {
        this.http.get<Trainer[]>(`${pokemonApiBaseUrl}?username=${username}`)
        .subscribe({
        next: (response) => {
            this._user = response;
        },
        error: (error) => {
            this._error = error.message;
        }
        });
    }

    public getTrainer(): Trainer | null {
        if (this._user.length == 1)
        {
            return this._user[0];  
        }

        return null;
    }    

    public getError(): string {
        return this._error;
    }    

}