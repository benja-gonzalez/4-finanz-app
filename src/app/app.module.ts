import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// modules
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';

// components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';


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
	],
	providers   : [],
	bootstrap   : [AppComponent]
})
export class AppModule { }
