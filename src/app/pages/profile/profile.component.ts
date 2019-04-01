import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor( public _userService: UsuarioService ) {
    // this.usuario = _userService.usuario;

  }

  ngOnInit() {
  }

  // guardar( usuario: Usuario ) {

  //   this.usuario.nombre = usuario.nombre;

  //     if ( ! this.usuario.google ) {
  //       this.usuario.email = usuario.email;
  //     }

  //   this.usuario.role = 'USER_ROLE';
  //   console.log( this.usuario );

  //   this._userService.actualizarUsuario( this.usuario )
  //                     .subscribe();
  // }

  // seleccionImagen( archivo: File) {

  //   if (! archivo ) {
  //       this.imagenSubir = null;
  //       return;
  //   }

  //   if ( archivo.type.indexOf('image') < 0 ) {
  //       this.imagenSubir = null;
  //       Swal.fire({
  //         type: 'error',
  //         title: '): ',
  //         text: 'Archivo no corresponde a una imagen!'
  //       });
  //       return;
  //   }
  //   this.imagenSubir = archivo;

  //   let reader = new FileReader();

  //   let urlImagenTemp = reader.readAsDataURL( archivo );

  //   reader.onload =  () => this.imagenTemp = reader.result.toString();

  //     console.log( reader.result );


  // }

  // cambiarImagen() {
  //   this._userService.cambiarImagen(this.imagenSubir, this.usuario._id);
  // }


}
