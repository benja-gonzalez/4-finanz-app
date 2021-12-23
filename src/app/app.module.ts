import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// firebase
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

// environments
import { environment } from '../environments/environment';

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
		// Importaciones necesarias hechas por firebase
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideAnalytics(() => getAnalytics()),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore())
	],
	providers   : [
    ScreenTrackingService,UserTrackingService
  ],
	bootstrap   : [AppComponent]
})
export class AppModule { }
