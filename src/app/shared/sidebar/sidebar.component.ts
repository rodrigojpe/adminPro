import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;
  img: string;
  constructor(public _sidebar: SidebarService, public _userService: UsuarioService ) {
    this.img = '../../../assets/images/icon/logo.jpeg';
  }

  ngOnInit() {
    this.img = '../../../assets/images/icon/logo.jpeg';

  }

}
