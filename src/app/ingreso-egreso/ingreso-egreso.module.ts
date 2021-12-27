import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';

// pipes
import { OrdenarIePipe } from '../pipes/ordenar-ie.pipe';
// componentes
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
@NgModule({
	declarations: [
		EstadisticaComponent,
		DetalleComponent,
		OrdenarIePipe, 
		IngresoEgresoComponent,
		DashboardComponent

	],
	imports: [
		CommonModule,
		NgChartsModule ,
		ReactiveFormsModule,
    	FormsModule,
		SharedModule,
		RouterModule,
		DashboardRoutesModule
	],
	exports: [
	]
})
export class IngresoEgresoModule { }
