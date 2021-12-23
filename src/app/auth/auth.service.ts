import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Angular Firestore
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { EventEmitter } from '@angular/core';

import { UserModel } from '../models/usuario.model';

export type UserPayloadRegister = { username: string, password: string, email: string };
export type UserPayloadLogin = { email:string, password: string };

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	db = getFirestore();
	private _user$: EventEmitter<any> = new EventEmitter();
	_userObs$!: Observable<any>;
	constructor(
		private _http: HttpClient,
		private _authFire: AngularFireAuth,
		private _afs: AngularFirestore
	) {
	
	}
	/**
	 * Observable del sign in/out
	 */
	initFireListener = (): void => {
		this._userObs$ = this._user$.asObservable();
		this._authFire.authState.subscribe( (info: any) => {this._user$.emit(info !== null); console.log({ info }); } );
	}

	crearUsuario = async (payload: UserPayloadRegister): Promise<any> => {
		return this._authFire.createUserWithEmailAndPassword(payload.email, payload.password)
			.then( async ({user}) => {
				const newUser = new UserModel( user?.uid, payload.email, payload.username);
				return this._afs.doc(`${newUser.uid}/usuario`).set({...newUser});
			});
	}

	loginUsuario = async (payload: UserPayloadLogin): Promise<any> => this._authFire.signInWithEmailAndPassword(payload.email,payload.password);

	logout = async (): Promise<any> => this._authFire.signOut();

	isLoged = (): Observable<boolean> => of(this._user$ != null);
}
