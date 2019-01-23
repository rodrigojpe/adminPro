import { Component, OnInit } from '@angular/core';
import { Promise } from 'q';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

     this.contarTresSegundos().then(
     mensaje  => console.log('Termino', mensaje)
    )
    .catch( error => console.log('Error en la promesa', error));

  }

  ngOnInit() {
  }

  contarTresSegundos(): Promise<boolean> {
    return Promise( (resolve, reject) => {

      let contador = 0;
      let intervalo =  setInterval( () => {
            contador += 1;

              console.log(contador);
              if (contador === 3) {
                    //  console.log(resolve);
                    resolve( true );
                    clearInterval(intervalo);
              }
          }, 1000);
    });
  }

}
