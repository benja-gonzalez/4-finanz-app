import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService, UserPayloadLogin } from '../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styles: [
	]
})
export class LoginComponent implements OnInit {

	formLogin!: FormGroup;

	constructor(
		private _fb: FormBuilder,
		private _router: Router,
		private _as: AuthService
	) {
		this.formLogin = this._initFormLogin();
	}

	ngOnInit(): void {
	}

	login = (): void => {
		// si el formulario es invalido no se logea.
		if(this.formLogin.invalid) {
			return;
		}
		// inicia el loading
		this._loadingSwal();

		this._as.loginUsuario(this.formLogin.value)
		.then(
			(userLoged:any) => {
				// cierrra la instancia del Swal.
				Swal.close();
				this._router.navigateByUrl('');
			}
		)
		.catch(
			(err:any) => {
				console.error({err});
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
