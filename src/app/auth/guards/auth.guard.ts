import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor( private _as: AuthService, private _router: Router){

	}

	canActivate(): Observable<boolean> {
		return this._as._userObs$.pipe( 
			tap( estado => { console.log({estado}); if(!estado) { this._router.navigate(['/login']); } } )
		);
	}

}
