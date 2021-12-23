import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// firebase
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

// components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { environment } from 'src/environments/environment';

const routes: Routes = [];

@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		HttpClientModule,
		// Importaciones necesarias hechas por firebase
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideAnalytics(() => getAnalytics()),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore())
	],
	exports: [
		LoginComponent,
		RegisterComponent
	],
	providers:
		[
			ScreenTrackingService,
			UserTrackingService
		]
})
export class AuthModule { }
