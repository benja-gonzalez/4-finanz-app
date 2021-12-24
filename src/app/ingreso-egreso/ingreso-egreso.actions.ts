import { createAction, props } from '@ngrx/store';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';

export const setItems   = createAction('[INGRESO-EGRESO] setItems',props<{items: IngresoEgresoModel[]}>());// agrega los items
export const unsetItems = createAction('[INGRESO-EGRESO] unsetItems');                                      // vacia los items