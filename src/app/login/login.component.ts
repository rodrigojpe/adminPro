import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;
  auth2: any;

  constructor(
    private _router: Router,
    public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1) {
      this.recuerdame = true;
    }

  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id : '789410988423-ivct65cmug1r72cs1l8qj1rfc9vb8bib.apps.googleusercontent.com',
        cookiepolice : 'single_host_origin',
        scope : 'profile email'
      });
      this.attachSignin( document.getElementById('btn_google'));
    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element , {} , (googleUser) => {

      let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      // console.log( token );

      this._usuarioService.loginGoogle( token)
                          .subscribe( resp => {
                            // console.log( resp );
                            this._router.navigate(['/dashboard']);
                            // window.location.href = '#/ashboard';
                          });

    });
  }

  ingresar( forma: NgForm) {

    console.log('ingresando' , forma.value);
    if ( !forma.valid ) {
        return ;
    }

      let usuario = new Usuario(null, forma.value.email, forma.value.password );
      this._usuarioService.ingresar(usuario, forma.value.recuerdame)
                          .subscribe( resp => this._router.navigate(['/dashboard']));

      // this._router.navigate(['/dashboard']);
  }

}
