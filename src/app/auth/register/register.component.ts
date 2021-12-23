import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styles: [
	]
})
export class RegisterComponent implements OnInit {

	registerForm!: FormGroup;

	constructor(
		private _fb: FormBuilder,
		private _as: AuthService
	) { 
		this.registerForm = this._initFormRegister();
	}

	get username() { return this.registerForm.get('username'); }
	get email() { return this.registerForm.get('email'); }
	get password() { return this.registerForm.get('password'); }

	ngOnInit(): void {
	}
	/**
	 * Agrega un nuevo usuario a nuestrta BBDD.
	 */
	agregarUsuario = (): void =>
	{
		// valido si es invalido el formulario.
		if (this.registerForm.invalid) { return; }
		const { value } = this.registerForm;

		this._as.crearUsuario(value)/* .then(
			(res:any) => console.log({res})
		).catch((err:any) => console.error({ err })); */
		console.log({ form: value });
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

}
