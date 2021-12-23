import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Angular Firestore
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { addDoc, collection, Firestore } from 'firebase/firestore'; 

export type UserPayload = { username: string, password: string, email: string };

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(
		private _http: HttpClient,
		private _authFire: AngularFireAuth
	) { }

	crearUsuario = (user: UserPayload)/* : Promise<any> */ => {
		try {
			/* const docRef = await addDoc(collection(null,'users'), {}) */
		} catch (e) {
			
		}
	}
}
