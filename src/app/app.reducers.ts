import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducers';
import * as auth from './auth/auth.reducers';
import * as ie from './ingreso-egreso/ingreso-egreso.reducers';

//-------------------------------------------------------------------------------------------------
// ACÁ ES DONDE VAN A IR TODOS LOS REDUCERS DE MI APP.
//-------------------------------------------------------------------------------------------------
export interface GlobalState {
   ui   : ui.UiState,
   auth : auth.AuthState,
   items: ie.IngresoEgresoState
}

export const appReducers: ActionReducerMap<GlobalState> = {
   ui   : ui.uiReducer,
   auth : auth.authReducer,
   items: ie.ingresoEgresoReducer
}