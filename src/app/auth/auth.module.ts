import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes,RouterModule } from '@angular/router';

const routes: Routes = [];

@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		
	],
	exports: [
		LoginComponent,
		RegisterComponent
	]
})
export class AuthModule { }
