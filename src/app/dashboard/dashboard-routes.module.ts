import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboarRoutes } from './dashboard.routes';

const routesHijas: Routes =
[
	{ path: '', children: DashboarRoutes },
];

@NgModule({
	declarations: [],
	imports: [
		RouterModule.forChild(routesHijas)
	],
	exports: [ 
		RouterModule
	]
})
export class DashboardRoutesModule { }
