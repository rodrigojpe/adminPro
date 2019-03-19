import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICE } from '../../config/config';

import { map } from 'rxjs/operators';
import { pipe } from '@angular/core/src/render3';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  mensage: string;
  token: string;
  usuario: Usuario;
  constructor(public http: HttpClient, public _router: Router  ) {
    // this.mensage = 'Service ready';
    // console.log('Servicio de usuario listo');
    this.cargarStorage();
  }

  estaLogeado() {

    return ( this.token.length > 5 ) ? true : false;
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this._router.navigate(['/login']);
    // localStorage.clear();

  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse (localStorage.getItem('usuario'));

    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.token = token;
    this.usuario = usuario;

  }


  loginGoogle( token: string) {
    let url = URL_SERVICE + '/login/google';

     return this.http.post( url, { token } )
                     .pipe(map( (resp: any) => {
                       this.guardarStorage(resp.id, resp.token, resp.usuario);
                       return true;
                     } ));

  }

  crearUsuario( usuario: Usuario) {
    let url = URL_SERVICE + '/usuario';

    return this.http.post( url, usuario )
              .pipe(map((res: any) => {
                Swal.fire({
                  type: 'success',
                  title: '(: ',
                  text: 'Usuario Creado Correctamente!'
                });
                  return res.usuario;
              }));
  }

  ingresar( usuario: Usuario, recuerdame: boolean = false   ) {

    let url = URL_SERVICE + '/login';

    if ( recuerdame ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post( url , usuario )
                    .pipe(map( (resp: any) => {
                        console.log(resp);
                        this.guardarStorage(resp.id, resp.token, resp.Usuario);
                         return true;
                    }));
  }
}
