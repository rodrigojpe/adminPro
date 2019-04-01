import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  imga: string;
  constructor( public _usuarioService: UsuarioService) {
    this.imga = '../../../assets/images/icon/logo.jpeg';
  }

  ngOnInit() {
    // this.usuario = this._usuerService.usuario;
    this.imga = '../../../assets/images/icon/logo.jpeg';
  }

}
