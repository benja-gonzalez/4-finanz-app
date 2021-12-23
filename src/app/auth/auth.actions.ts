import { createAction, props } from '@ngrx/store';
import { UserModel } from '../models/usuario.model';

export const setUsuario   = createAction('[AUTH] Set usuario', props<{usuario: UserModel}>());
export const unsetUsuario = createAction('[AUTH] Unset usuario');