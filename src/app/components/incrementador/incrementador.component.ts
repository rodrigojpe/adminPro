import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

@ViewChild('txtprogres') txtprogres: ElementRef;
@Input() leyenda: string = 'Leyenda';
@Input() progreso: number = 50;
@Output() CambioValor: EventEmitter<number> = new EventEmitter();


  constructor() {

    console.log('leyenda', this.leyenda);
    console.log('progreso', this.progreso);

  }

  ngOnInit() {
    console.log('leyenda', this.leyenda);

  }
  onChanges( newValue: number ) {
    // console.log(newValue);

    if (newValue >= 100) {
        this.progreso = 100;
     } else if (newValue <= 0) {
        this.progreso = 0;
     } else {
       this.progreso = newValue;
     }
     this.txtprogres.nativeElement.value = this.progreso;

     this.CambioValor.emit( this.progreso );
      
  }

  CambiarValor(valor: number) {

    if (this.progreso >= 100 && valor > 0 ) {
      this.progreso = 100;
      return;
     }

     if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
     }
     this.progreso = this.progreso + valor;

     this.CambioValor.emit( this.progreso );

     this.txtprogres.nativeElement.focus();

  }

}
