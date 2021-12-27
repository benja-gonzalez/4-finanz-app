import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GlobalState } from '../app.reducers';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styles: [
	]
})
export class DashboardComponent implements OnInit, OnDestroy {

	suscription!: Subscription;

	constructor(private _store: Store<GlobalState>, private _ies:IngresoEgresoService ) { }

	ngOnInit(): void {

		this.suscription = this._store.select('auth').pipe(filter(auth => auth.usuario !== null))
			.subscribe(
				(usuario: any) => {
					console.log({ usuario });
					this._ies.initIngresoEgresoListener(usuario.usuario.uid);
				}
		);
		

	}
	ngOnDestroy(): void {
		this.suscription.unsubscribe();
	}

}
