import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn: 'root',
})

export class SharedService {
    private _obs$ = new BehaviorSubject<boolean>(false);

    // No se utiliza directamente el BehaviorSubject (buena practica)
    // Se canaliza su uso a través de un observable que será público.
    // Este observable llamará quién quiera ver el último mensaje que se dejó.
    changes$ = this._obs$.asObservable();
  
    // Almacenar mensaje, listo para mostrarlo a quién lo pida.
    enviar(value: boolean) {
      // function que llamará quien quiera transmitir un mensaje.
      this._obs$.next(value);
    }
  
    constructor() { }
}
