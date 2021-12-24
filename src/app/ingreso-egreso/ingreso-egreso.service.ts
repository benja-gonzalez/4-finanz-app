import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Firestore } from 'firebase/firestore';
import { GlobalState } from '../app.reducers';
import { AuthService } from '../auth/auth.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { UserModel } from '../models/usuario.model';

@Injectable({
	providedIn: 'root'
})
export class IngresoEgresoService {

	constructor(
		private _store: Store<GlobalState>,
		private _fs: AngularFirestore,
		private _as: AuthService
	) { }

	agregarIngresoEgreso = (value: IngresoEgreso): Promise<any> => {
		const { uid } = this._as.user;
		const { descripcion,monto,tipo } = value;
		const doc = this._fs.doc(`${uid}/ingreso-egreso`);
		console.log({doc})
		return doc.collection('items').ref.add({ descripcion, monto, tipo });
	}
}
