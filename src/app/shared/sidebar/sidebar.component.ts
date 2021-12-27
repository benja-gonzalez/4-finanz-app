import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GlobalState } from 'src/app/app.reducers';
import { AuthService } from 'src/app/auth/auth.service';
import { UserModel } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import * as auth from '../../auth/auth.actions';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styles: [
	]
})
export class SidebarComponent implements OnInit, OnDestroy {

	subscription!: Subscription;
	activeUser!  : UserModel;

	constructor(
		private _router: Router,
		private _as: AuthService,
		private _store:Store<GlobalState>
	) { }

	ngOnInit(): void {
		this.subscription = this._store.select('auth').subscribe( ({usuario}) => this.activeUser = usuario  );
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	logout = (): void => {

		this._as.logout().then(
			() => {
				Swal.close();
				this._router.navigate(['/login']);
			}
		).catch(
			(err: any) => {
				console.error({err});
				Swal.fire({ icon: 'error', text: err.message });
			}
		);
	}

}
