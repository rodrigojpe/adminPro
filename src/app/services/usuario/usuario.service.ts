import { Injectable } from '@angular/core';
import { HttpClient, HttpUrlEncodingCodec, HttpHeaders, HttpParams } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICE } from '../../config/config';

import { map } from 'rxjs/operators';
import { pipe } from '@angular/core/src/render3';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { UsuarioSn } from '../../models/user.sn';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  mensage: string;
  token: string;
  // usuario: Usuario;
  constructor(public http: HttpClient, public _router: Router ) {
    // this.mensage = 'Service ready';
    // console.log('Servicio de usuario listo');
     this.cargarStorage();
  }

  estaLogeado() {

    return ( this.token.length > 5 ) ? true : false;
  }

  logout() {
    // this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    // localStorage.removeItem('usuario');
    this._router.navigate(['/login']);
    localStorage.clear();

  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');

    } else {
      this.token = '';
    }
  }

  guardarStorage(token: string) {

    localStorage.setItem('token', token);
    this.token = token;

  }


  // loginGoogle( token: string) {
  //   let url = URL_SERVICE + '/login/google';

  //    return this.http.post( url, { token } )
  //                    .pipe(map( (resp: any) => {
  //                      this.guardarStorage(resp.id, resp.token, resp.usuario);
  //                      return true;
  //                    } ));

  // }
  looginSn5(usuarioSn: UsuarioSn) {


    let url = 'http://rcid.cl/api/sn5/usuario/Authorized?data=' + encodeURIComponent(JSON.stringify(usuarioSn));

    // console.log(url);


    return  this.http.get( url )
                  .pipe(map( (res: any ) => {
                      console.log(res.access_token);
                      this.guardarStorage(res.access_token);
                      return res;
                  })) ;
  }

  // crearUsuario( usuario: Usuario) {
  //   let url = URL_SERVICE + '/usuario';

  //   return this.http.post( url, usuario )
  //             .pipe(map((res: any) => {
  //               Swal.fire({
  //                 type: 'success',
  //                 title: '(: ',
  //                 text: 'Usuario Creado Correctamente!'
  //               });
  //                 return res.usuario;
  //             }));
  // }

  // ingresar( usuario: Usuario, recuerdame: boolean = false   ) {

  //   let url = URL_SERVICE + '/login';

  //   if ( recuerdame ) {
  //     localStorage.setItem('email', usuario.email);
  //   } else {
  //     localStorage.removeItem('email');
  //   }

  //   return this.http.post( url , usuario )
  //                   .pipe(map( (resp: any) => {
  //                       console.log(resp);
  //                       this.guardarStorage(resp.id, resp.token, resp.usuario);
  //                        return true;
  //                   }));
  // }

  // actualizarUsuario( usuario: Usuario ) {

  //   let url = URL_SERVICE + '/usuario/' + usuario._id;

  //   console.log( usuario._id );

  //   url += '?token=' + this.token;
  //   // console.log( url );

  //   return this.http.put( url , usuario )
  //                   .pipe(map( (res: any) => {
  //                       let usuarioBD: Usuario = res.usuario;
  //                       this.guardarStorage( usuarioBD._id, this.token, usuarioBD);
  //                           Swal.fire({
  //                             type: 'success',
  //                             title: '(: ',
  //                             text: 'Usuario Actualizado Correctamente!'
  //                           });
  //                           return true;
  //                     }));
  // }

  // cambiarImagen( archivo: File, id: string ) {
  //   this._subirArchivoService.subirArchivo( archivo, 'user', id)
  //       .then( (resp: any) => {
  //         console.log( resp );
  //         this.usuario.img = resp.usuario.img;
  //         Swal.fire({
  //           type: 'success',
  //           title: '(: ',
  //           text: 'Imagen Actualizada Correctamente!'
  //         });
  //         this.guardarStorage(id, this.token, this.usuario);
  //       })
  //       .catch( resp => {
  //         console.log( resp );
  //       });
  // }

  getPaises () {
    let url = 'http://rcid.cl/api/sn5/pais/All';

    // console.log(url);


    return  this.http.get( url )
                  .pipe(map( (res: any ) => {
                      //  console.log(res);
                      return res;
                  })) ;
  }

  filtoPaises(id: any = '', razonSocial: string = '', nombreFantasia: string = '' ) {

    let data = {
      pais_id: id,
      razon_social: razonSocial,
      nombre_fantasia: nombreFantasia
    };

    // console.log(data);
    // tslint:disable-next-line:max-line-length
    let url2 = 'http://rcid.cl/api/sn5/proveedor/Search?data={"pais_id": ' + id + ',"razon_social": ' + razonSocial + ' ,"nombre_fantasia": "" }';
     let url = 'http://rcid.cl/api/sn5/proveedor/Search?data='; // +    encodeURIComponent(JSON.stringify(data));
    // this.http.get<any>(url,  {params: data});

    // console.log(url2);
    return  this.http.get( url, {params: data} )
                  .pipe(map( (res: any ) => {
                      //  console.log(res);
                      return res;
                  })) ;
  }

}
