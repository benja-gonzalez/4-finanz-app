// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AuthModule } from './auth/auth.module';
import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';
import { SharedModule } from './shared/shared.module';


// NGRX 
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducers';

// environment
import { environment } from 'src/environments/environment';

// components
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';



@NgModule({
	declarations: [
		AppComponent,
	],
	imports     : [
		BrowserModule,
		AppRoutingModule,
		AuthModule,
		StoreModule.forRoot(appReducers),
		// Instrumentation must be imported after importing StoreModule (config is optional)
		StoreDevtoolsModule.instrument({
			maxAge: 25, // Retains last 25 states
			logOnly: environment.production, // Restrict extension to log-only mode
			autoPause: true, // Pauses recording actions and state changes when the extension window is not open
		}),

	],
	providers   : [],
	bootstrap   : [AppComponent]
})
export class AppModule { }