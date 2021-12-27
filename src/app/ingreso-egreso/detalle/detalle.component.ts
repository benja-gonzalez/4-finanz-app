import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { GlobalState } from '../../app.reducers';
import { IngresoEgresoModel } from '../../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../ingreso-egreso.service';

@Component({
	selector: 'app-detalle',
	templateUrl: './detalle.component.html',
	styles: [
	]
})
export class DetalleComponent implements OnInit, OnDestroy {

	suscription!    : Subscription;
	ingresosEgresos!: IngresoEgresoModel[];

	constructor(
		private _store: Store<GlobalState>,
		private _ies: IngresoEgresoService
	) {
		
	}

	ngOnInit(): void {
		this.suscription = this._store.select('items').subscribe(({items}) => { this.ingresosEgresos = items; } );
	}

	ngOnDestroy(): void {
		this.suscription.unsubscribe();
	}

	eliminarItem = (value:string) => {
		this._ies.borrarItem(value).then( () => Swal.fire({icon: 'success', text: 'Elemento borrado correctamente.'}) )
		.catch( (err) => Swal.fire({icon: 'success', text: err.message}) )
	}

}
