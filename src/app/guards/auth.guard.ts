import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { take, tap } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/shared.services';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor( private _sh: SharedService, private _router: Router){}

	canActivate(): Observable<boolean> {
		return this._sh.changes$.pipe( 
			tap(estado => {
				if (!estado) {
					this._router.navigate(['/login']);
				}
			})
		);
	}

}
