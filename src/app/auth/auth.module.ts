import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [];

@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule
	],
	exports: [
		LoginComponent,
		RegisterComponent
	]
})
export class AuthModule { }
