import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { GlobalState } from '../app.reducers';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

import * as ui from '../shared/ui.actions';
import * as ie from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-ingreso-egreso',
	templateUrl: './ingreso-egreso.component.html',
	styles: [
	]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

	ingresoegresoForm!: FormGroup;
	tipo              : string = 'ingreso';
	suscription!      : Subscription;
	loading           : boolean = false;

	constructor(
		private _store: Store<GlobalState>,
		private _fb: FormBuilder,
		private _ies: IngresoEgresoService 
	) {
		this.ingresoegresoForm = this._initForm();
		this.suscription = this._store.select('ui').subscribe(
			state => this.loading = state.isLoading
		);
	}

	ngOnInit(): void {
	}
	ngOnDestroy(): void {
		this.suscription.unsubscribe();
	}
	/**
	 * Agrega un nuevo ingreso o egreso.
	 * @returns void
	 */
	agregarIngreso = (): void => {
		if (this.ingresoegresoForm.invalid) { return; }

		this._store.dispatch(ui.isLoading());

		const { descripcion, monto } = this.ingresoegresoForm.value;
		const ingresoEgreso = new IngresoEgresoModel(descripcion, monto, this.tipo);

		this._ies.agregarIngresoEgreso(ingresoEgreso).then(
			(ref: any) => {
				this._store.dispatch(ui.stopLoading());
				// this._store.dispatch()
				this.ingresoegresoForm.reset();
				Swal.fire({
					icon : 'success',
					text : 'Agregado correctamente.',	
					title: this.tipo,
					timer: 1050
				});
			}).catch(
				(err) => {
					this._store.dispatch(ui.stopLoading());
					Swal.fire({ icon: 'error', text: err.message });
					console.warn({ err });
				}
			);
	}
	/**
	 * Inicializa el formulario
	 * @returns FormGroup
	 */
	private _initForm = (): FormGroup => this._fb.group({
		descripcion: ['', [Validators.maxLength(220), Validators.required] ],
		monto      : ['', Validators.required]
	});

}
