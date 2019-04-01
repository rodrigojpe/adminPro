import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
 


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService,
    public _router: Router) {

  }

  canActivate() {
     if ( this._usuarioService.estaLogeado()) {
        console.log('paso por el GUARD');
        return true;
     } else {
       this._router.navigate(['/login']);
       console.log('bloqueado por el guard');
       return false;
     }
    return true;
  }
}
