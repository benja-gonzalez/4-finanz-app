import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styles: [
	]
})
export class SidebarComponent implements OnInit {

	constructor(
		private _router: Router,
		private _as: AuthService
	) { }

	ngOnInit(): void {
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
