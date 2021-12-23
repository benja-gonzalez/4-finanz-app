import { Action, createReducer, on } from '@ngrx/store';
import { UserModel } from '../models/usuario.model';
import { setUsuario,unsetUsuario } from './auth.actions';

export interface AuthState {
    usuario: any | null; 
}

export const initialState: AuthState = {
   usuario: null,
}

const _authReducer = createReducer(initialState,
    on(setUsuario, (state,{usuario}) => ({ ...state, usuario:{...usuario}})),
    on(unsetUsuario, (state) => ({ ...state, usuario: null})),

);

export function authReducer(state: AuthState | undefined, action: Action) {
    return _authReducer(state, action);
}