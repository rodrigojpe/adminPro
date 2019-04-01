import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICE } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: any, tipo: string= 'usuario'): any {

    let url = URL_SERVICE + '/imagenes';

    if (! img) {
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('http') >= 0  ) {
      console.log(img);
      return img ;
    }

    switch ( tipo ) {
      case 'usuario':
        return url + '/user/' + img;
      break;
      case 'medicos':
        return url + '/medicos/' + img;
      break;
      case 'hospital':
        return url + '/hospitales/' + img;
      break;
      default :
        console.log('imagen no existe en medicos usuarios y hospitales');
        url +=  '/usuarios/xxx';
    }
    return url;
  }

}
