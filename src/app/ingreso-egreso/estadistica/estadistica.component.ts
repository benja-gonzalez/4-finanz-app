import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GlobalState } from 'src/app/app.reducers';
import { IngresoEgresoModel } from 'src/app/models/ingreso-egreso.model';
import { ChartData, ChartType } from 'chart.js';

@Component({
	selector: 'app-estadistica',
	templateUrl: './estadistica.component.html',
	styles: [
	]
})
export class EstadisticaComponent implements OnInit, OnDestroy {

	ingresos     : number = 0;
	egresos      : number = 0;

	totalEgresos : number = 0;
	totalIngresos: number = 0;

	subscription! : Subscription;
	//-------------------------------------------------------------------------------------------------
	// Graficas de ng2-charts
	//-------------------------------------------------------------------------------------------------
	public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos' ];
	public doughnutChartData: ChartData<'doughnut'> = {
		labels: this.doughnutChartLabels,
		datasets: [
		{ data: [] },
		]
	};
	public doughnutChartType: ChartType = 'doughnut';

	constructor(
		private _store: Store<GlobalState>
	) {
	}

	ngOnInit(): void {
		this.subscription = this._store.select('items').subscribe(({ items }) => {
			this.generarEstadistica(items);
			// console.log({items})
		} );
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
		this.ingresos = 0;
		this.egresos = 0;
	}

	generarEstadistica = (value: IngresoEgresoModel[]): void => {
		this.ingresos = 0;
		this.egresos = 0;

		this.totalEgresos = 0;
		this.totalIngresos = 0;
		
		for (const item of value) {
			if (item.tipo === 'ingreso') {
				this.totalIngresos += item.monto;
				this.ingresos ++;
			} else if (item.tipo === 'egreso') {
				this.totalEgresos += item.monto;
				this.egresos++;
			}
		}
		this.doughnutChartData.datasets = [{data:[this.totalIngresos, this.totalEgresos]}];
	}

}
