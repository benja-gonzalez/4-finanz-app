// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// NGRX 
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducers';

// environment
import { environment } from 'src/environments/environment';

// components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';



@NgModule({
	declarations: [
		AppComponent,
		DashboardComponent,
		IngresoEgresoComponent,
		FooterComponent,
		NavbarComponent,
		SidebarComponent
	],
	imports     : [
		BrowserModule,
		AppRoutingModule,
		AuthModule,
		ReactiveFormsModule,
    	FormsModule,
		StoreModule.forRoot(appReducers),
		// Instrumentation must be imported after importing StoreModule (config is optional)
		StoreDevtoolsModule.instrument({
			maxAge: 25, // Retains last 25 states
			logOnly: environment.production, // Restrict extension to log-only mode
			autoPause: true, // Pauses recording actions and state changes when the extension window is not open
		}),
		IngresoEgresoModule
	],
	providers   : [],
	bootstrap   : [AppComponent]
})
export class AppModule { }