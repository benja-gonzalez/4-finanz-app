import { Action, createReducer, on } from '@ngrx/store';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';
import { setItems, unsetItems } from './ingreso-egreso.actions';

export interface IngresoEgresoState {
    items: IngresoEgresoModel[]; 
}

export const initialState: IngresoEgresoState = {
   items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(setItems, (state,{items})=> ({ ...state, items: [...items] })),
    on(unsetItems, (state)=> ({ ...state,items: [] })),

);

export function ingresoEgresoReducer(state: IngresoEgresoState | undefined, action: Action) {
    return _ingresoEgresoReducer(state, action);
}