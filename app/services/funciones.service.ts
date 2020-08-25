import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  constructor() { }

  slugify(palabra: string) {
    const chars = {
      "á":"a", "é":"e", "í":"i", "ó":"o", "ú":"u", "ñ":"n"
    };

    const palabraSlugify = palabra
                          .trim()
                          .toLowerCase()
                          .replace(/\s+/g, '-')
                          .replace(/[áéíóúñ]/g, e => chars[e])

    return palabraSlugify;
  }
}
