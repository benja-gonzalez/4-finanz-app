import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';

@Pipe({
	name: 'ordenarIe'
})
export class OrdenarIePipe implements PipeTransform {

	transform(value: IngresoEgresoModel[]): IngresoEgresoModel[] {
		return [...value].sort((a: IngresoEgresoModel): 1 | -1 => (a.tipo === 'ingreso') ? -1 : 1);
	}

}
