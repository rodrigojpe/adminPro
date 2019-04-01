import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsuarioService } from '../../services/usuario/usuario.service';

// let dateFormat = require('dateformat');
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  forma: FormGroup;
  id: string = '8';
  razonSocial: string = '';
  nombreFantasia: string = '';
  title: string;
  paises: [] ;
  filtroPaises = [];
  cargando: boolean = false;
  constructor(public _usuarioService: UsuarioService) {
    // this._usuarioService.getPaises();
      this.paises = [];
      this.filtroPaises = [];
  }
  search(): void {
    let term = this.nombreFantasia;
    this.filtroPaises = this.filtroPaises.filter(function(tag: any) {
        return tag.nombre_fantasia.toLowerCase().indexOf(term) > 0;
    });
  }
  ngOnInit() {
    this.title = 'Lista de paises';

    // this.date = new Date();
    // dateFormat(this.date, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
    this._usuarioService.getPaises()
    .subscribe( (resp: any) =>  {
      if ( resp ) {
        this.paises = resp;
        // console.log(this.paises);
      }
    });
    this._usuarioService.filtoPaises(8, '' , '')
    .subscribe( (res: any ) => {
       if ( res ) {
         this.filtroPaises = res;
         this.cargando = true;
       }
      // console.log(res);

    });
  }

  buscaPais() {
    this.cargando = false;
    this._usuarioService.filtoPaises(this.id,  this.razonSocial, this.nombreFantasia)
                         .subscribe( (res: any) => {
                          //  this.filtroPaises.cliente_id = res[0].cliente_id;
                          //  this.filtroPaises.nombre_fantasia = res[0].nombre_fantasia;
                          //  this.filtroPaises.razon_social = res[0].razon_social;
                          //  this.filtroPaises.region.nombre = res[0].region.nombre;
                           this.filtroPaises = res;
                           this.cargando = true;
                            // console.log('filtro', this.filtroPaises);
                         });
  }





}
