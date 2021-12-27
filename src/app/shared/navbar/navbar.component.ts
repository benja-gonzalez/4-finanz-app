import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GlobalState } from 'src/app/app.reducers';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styles: [
	]
})
export class NavbarComponent implements OnInit, OnDestroy {
	
	user$: any;
	suscription!: Subscription;
	
	constructor(
		private _store: Store<GlobalState>
	) {
		// Limpiar la suscripcion siempre.
		this.suscription = this._store.select('auth').subscribe( ({usuario}) => this.user$ = usuario );
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.suscription.unsubscribe();
	}

}
