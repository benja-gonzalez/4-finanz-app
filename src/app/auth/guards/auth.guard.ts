import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.services';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
;
	constructor( private _sh: SharedService, private _router: Router){}

	canActivate(): Observable<boolean> {
		return this._sh.changes$.pipe( 
			tap( estado => { if(!estado) { this._router.navigate(['/login']); } } )
		);
	}

}
