import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GlobalState } from '../app.reducers';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';
import * as ie from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styles: [
	]
})
export class DashboardComponent implements OnInit, OnDestroy {

	suscription!  : Subscription;
	suscriptionIE!: Subscription;

	constructor(private _store: Store<GlobalState>, private _ies:IngresoEgresoService ) { }

	ngOnInit(): void {

		this.suscription = this._store.select('auth').pipe(filter(auth => auth.usuario !== null))
			.subscribe(
				(usuario: any) => {
					this.suscriptionIE = this._ies.initIngresoEgresoListener(usuario.usuario.uid).subscribe(
						(ieFirestore:any[]) => {
							this._store.dispatch(ie.setItems({items: ieFirestore}));
						}
					);
				}
		);
		

	}
	ngOnDestroy(): void {
		this.suscription?.unsubscribe();
		this.suscriptionIE?.unsubscribe();
		this._store.dispatch(ie.unsetItems());
	}

}
