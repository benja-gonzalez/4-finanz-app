import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { GlobalState } from '../app.reducers';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

@Component({
	selector: 'app-ingreso-egreso',
	templateUrl: './ingreso-egreso.component.html',
	styles: [
	]
})
export class IngresoEgresoComponent implements OnInit {

	ingresoegresoForm!: FormGroup;
	tipo: string = 'ingreso';

	constructor(
		private _store: Store<GlobalState>,
		private _fb: FormBuilder,
		private _ies: IngresoEgresoService 
	) {
		this.ingresoegresoForm = this._initForm();
	}

	ngOnInit(): void {
	}
	/**
	 * Agrega un nuevo ingreso o egreso.
	 * @returns void
	 */
	agregarIngreso = (): void => {
		if (this.ingresoegresoForm.invalid) { return; }

		const { descripcion, monto } = this.ingresoegresoForm.value;
		const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

		this._ies.agregarIngresoEgreso(ingresoEgreso).then(
			(ref: any) => {
				this.ingresoegresoForm.reset();
				Swal.fire({
					icon : 'success',
					text : 'Agregado correctamente.',	
					title: this.tipo,
					timer: 1050
				});
			}).catch(
				(err) => {
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
