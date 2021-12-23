import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'finanz-app';

	constructor(private _as: AuthService) {
		this._as.initFireListener();
	}
}
