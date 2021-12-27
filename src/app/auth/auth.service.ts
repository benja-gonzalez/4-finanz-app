import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
// Angular Firestore
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription, SubscriptionLike } from 'rxjs';

import { UserModel } from '../models/usuario.model';
import { GlobalState } from '../app.reducers';
import { Store } from '@ngrx/store';
import * as auth from './auth.actions';
import { SharedService } from '../shared/shared.services';

export type UserPayloadRegister = { username: string, password: string, email: string };
export type UserPayloadLogin = { email:string, password: string };

@Injectable({
	providedIn: 'root'
})
export class AuthService implements OnDestroy{
	db = getFirestore();
	private _user$!: UserModel | null;
	suscription: SubscriptionLike = new Subscription();

	constructor(
		private _authFire: AngularFireAuth,
		private _afs: AngularFirestore,
		private _store:Store<GlobalState>,
		private _sh: SharedService

	) {
	
	}
	get user() { return { ...this._user$ }; }
	ngOnDestroy(): void {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
		this.suscription.unsubscribe();
		this._user$ = null;
	}
	/**
	 * Observable del sign in/out
	 */
	initFireListener = (): void => {
		
		this._authFire.authState.subscribe( (info: any) => {
			if(info){
				this.suscription = this._afs.doc(`${info.multiFactor.user.uid}/usuario`).valueChanges().subscribe( (fUsuario: any) => {
					// metodo estatico para devolver una instancia del modelo usuario.
					const usuario = UserModel.fromFirestore(fUsuario);
					this._user$ = usuario;
					this._store.dispatch(auth.setUsuario({usuario}));
				});
			} else {
				this._user$ = null;
				this.suscription.unsubscribe();
				this._store.dispatch(auth.unsetUsuario());
			}
			this._isLogged();
		} );
	}

	crearUsuario = async (payload: UserPayloadRegister): Promise<any> => {
		return this._authFire.createUserWithEmailAndPassword(payload.email, payload.password)
			.then( async ({user}) => {
				const newUser = new UserModel(user?.uid, payload.email, payload.username);
				return this._afs.doc(`${newUser.uid}/usuario`).set({...newUser});
			});
	}

	loginUsuario = async (payload: UserPayloadLogin): Promise<any> => this._authFire.signInWithEmailAndPassword(payload.email,payload.password);

	logout = async (): Promise<any> => this._authFire.signOut();

	private _isLogged = () => this._sh.enviar(this._user$ !== null);
}
