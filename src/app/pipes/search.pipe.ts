import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, term: string, rsocial: string, nombre: string): any {

    // console.log('pipes', value);
    // console.log('rsocial', rsocial);
    // console.log('nombre' , nombre);


  if (term.length > 0) {
  return value.filter(function(item) {

    // console.log('item', item.cliente_id);
    // console.log('termino', term);

    if ( item.cliente_id.toString() === term) {
      // console.log('son iguales');
        return item;
    }

  });
}

  if (rsocial !== undefined ) {
    return value.filter(function(item) {
      return item.razon_social.toLowerCase().includes(rsocial.toLowerCase());
    });
  }
  if (nombre) {
    console.log('nombre' , nombre);
    return value.filter(function(item: any) {
      return item.nombre_fantasia.toLowerCase().indexOf(nombre) > -1;
    });
  }
  }
}
