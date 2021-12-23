import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';



@NgModule({
  declarations: [
    EstadisticaComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class IngresoEgresoModule { }
