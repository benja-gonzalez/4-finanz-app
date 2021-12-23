import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GlobalState } from '../../app.reducers';
import Swal from 'sweetalert2';
import * as ui from '../../shared/ui.actions';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styles: [
	]
})
export class RegisterComponent implements OnInit, OnDestroy {

	registerForm! : FormGroup;
	uiSuscription!: Subscription;
	loading       : boolean = false;

	constructor(
		private _fb: FormBuilder,
		private _as: AuthService,
		private _router: Router,
		private _store: Store<GlobalState>
	) { 
		this.registerForm = this._initFormRegister();
	}

	get username() { return this.registerForm.get('username'); }
	get email() { return this.registerForm.get('email'); }
	get password() { return this.registerForm.get('password'); }

	ngOnInit(): void {
		this.uiSuscription = this._store.select('ui').subscribe(
			state => this.loading = state.isLoading
		);
	}
	ngOnDestroy(): void {
		this.uiSuscription.unsubscribe();
	}
	/**
	 * Agrega un nuevo usuario a nuestrta BBDD.
	 */
	agregarUsuario = (): void =>
	{
		// valido si es invalido el formulario.
		if (this.registerForm.invalid) { return; }
		this._store.dispatch(ui.isLoading());
		/* // dispara el pop up loading
		this._loadingSwal(); */
		// obtengo las credenciales
		const { value } = this.registerForm;

		// llamado al servicio de auth con credencialesd el form
		this._as.crearUsuario(value).then(
			(credentials:any) => {

				this._store.dispatch(ui.stopLoading());
				/* // cierra la instancia del Swal
				Swal.close(); */
				this._router.navigate(['']);
			}
		).catch((err:any) => {
			this._store.dispatch(ui.stopLoading());
			console.error({ err });
			Swal.fire({ icon: 'error', text: err.message});
		});
	}

	/**
	 * Retorna un form group
	 * @returns FormGroup
	 */
	private _initFormRegister = (): FormGroup => this._fb.group(
		{
			username: ['', [Validators.required, Validators.minLength(5)]],
			email   : ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(8)]],
		}
	);
	/**
	 * Dispara el pop up loading
	 * @returns Promise<any>
	 */
	private _loadingSwal = (): Promise<any> => Swal.fire({ text: 'Cargando...', didOpen: () => { Swal.showLoading() } });

}
