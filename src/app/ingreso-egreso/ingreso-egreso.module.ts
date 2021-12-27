import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';

// pipes
import { OrdenarIePipe } from '../pipes/ordenar-ie.pipe';
// componentes
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';


@NgModule({
	declarations: [
		EstadisticaComponent,
		DetalleComponent,
		OrdenarIePipe
	],
	imports: [
		CommonModule,
		BrowserModule,
		NgChartsModule 
	],
})
export class IngresoEgresoModule { }
