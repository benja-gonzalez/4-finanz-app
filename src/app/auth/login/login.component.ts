import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GlobalState } from '../../app.reducers';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styles: [
	]
})
export class LoginComponent implements OnInit, OnDestroy {

	formLogin!    : FormGroup;
	loading       : boolean = false;
	uiSuscription!: Subscription;

	constructor(
		private _fb: FormBuilder,
		private _router: Router,
		private _as: AuthService, 
		private _store: Store<GlobalState>
	) {
		this.formLogin = this._initFormLogin();
	}

	ngOnInit(): void {
		this.uiSuscription = this._store.select('ui').subscribe(
			state => this.loading = state.isLoading
		);
		/* if(this.loading){
			// inicia el cargando
			this._loadingSwal();
		}else {
			// cierra la instancia del swal
			Swal.close();
		} */
	}

	ngOnDestroy(): void {
		this.uiSuscription.unsubscribe();
	}

	login = (): void => {
		// si el formulario es invalido no se logea.
		if(this.formLogin.invalid) {
			return;
		}
		
		// accion de cargando
		this._store.dispatch(ui.isLoading());
		this._as.loginUsuario(this.formLogin.value)
		.then(
			(userLoged:any) => {
				this._store.dispatch(ui.stopLoading());
				this._router.navigateByUrl('');
			}
		)
		.catch(
			(err:any) => {
				console.error({err});
				this._store.dispatch(ui.stopLoading());
				// esto tambien corta el loading
				Swal.fire({ icon: 'error', text: err.message});
			}
		);
	} 

	/**
	 * Inicializa el formulario de login.
	 * @returns FormGroup
	 */
	private _initFormLogin = (): FormGroup => this._fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(8)]]
	});
	/**
	 * Dispara el pop up loading
	 * @returns Promise<any>
	 */
	private _loadingSwal = (): Promise<any> => Swal.fire({ text: 'Cargando...', didOpen: () => { Swal.showLoading() } });
	

}
