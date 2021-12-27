import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboarRoutes } from './dashboard/dashboard.routes';

const routes: Routes =
[
	/* Lazyload */
	{ path: '', component: DashboardComponent, /* canLoad: [AuthGuard], */ 
		loadChildren:() => import('./ingreso-egreso/ingreso-egreso.module').then( m => m.IngresoEgresoModule ) },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: '**',  redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
