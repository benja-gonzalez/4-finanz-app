import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { take, tap } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/shared.services';
import { AuthService } from '../auth/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

	constructor( private _as: AuthService, private _router: Router){}

	canLoad(): Observable<boolean> {
		return this._as._isLogged().pipe( 
			tap(estado => {
				if (!estado) {
					this._router.navigate(['/login']);
				}
			}),
			take(1)
		);
	}

	canActivate(): Observable<boolean> {
		return this._as._isLogged().pipe( 
			tap(estado => {
				if (!estado) {
					this._router.navigate(['/login']);
				}
			})
		);
	}

}
