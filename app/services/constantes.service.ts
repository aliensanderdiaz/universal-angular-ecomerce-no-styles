import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantesService {

  CATEGORIAS: any = [
    {
      nombre: 'Electrodomésticos',
      categorias: [
        {
          nombre: 'Asadores Eléctricos',
          categorias: []
        },
        {
          nombre: 'Aspiradoras',
          categorias: []
        },
        {
          nombre: 'Batidoras',
          categorias: []
        },
        {
          nombre: 'Cafeteras y hervidoras',
          categorias: []
        },
        {
          nombre: 'Dispensadores de agua',
          categorias: []
        },
        {
          nombre: 'Estufas',
          categorias: [
            {
              nombre: 'Estufas con Gabinete'
            },
            {
              nombre: 'Estufas con Horno'
            },
            {
              nombre: 'Estufas electricas'
            },
            {
              nombre: 'Gasolina'
            },
            {
              nombre: 'Sobremesa'
            }
          ]
        },
        {
          nombre: 'Exprimidores de cítricos',
          categorias: []
        },
        {
          nombre: 'Extractores de jugos',
          categorias: []
        },
        {
          nombre: 'Hornos',
          categorias: []
        },
        {
          nombre: 'Lavadoras',
          categorias: []
        },
        {
          nombre: 'Licuadoras',
          categorias: []
        },
        {
          nombre: 'Loncheras',
          categorias: []
        },
        {
          nombre: 'Neveras',
          categorias: []
        },
        {
          nombre: 'Ollas Arroceras',
          categorias: []
        },
        {
          nombre: 'Planchas de ropa',
          categorias: []
        },
        {
          nombre: 'Procesadores de alimentos',
          categorias: []
        },
        {
          nombre: 'Sandwicheras',
          categorias: []
        },
        {
          nombre: 'Televisores',
          categorias: []
        },
        {
          nombre: 'Tostadoras',
          categorias: []
        },
        {
          nombre: 'Ventiladores',
          categorias: [
            {
              nombre: 'Mesa, pared y piso'
            },
            {
              nombre: 'Pedestal y Multiusos'
            },
            {
              nombre: 'Techo'
            },
            {
              nombre: 'Torre'
            }
          ]
        },
      ]
    },
    {
      nombre: 'Cocina y Mesa',
      categorias: [
        { nombre: 'Baterías de cocina', 
      categorias: []},
        { nombre: 'Básculas de cocina', 
      categorias: []},
        { nombre: 'Cacerolas', 
      categorias: []},
        { nombre: 'Calderos', 
      categorias: []},
        { nombre: 'Chocolateras', 
      categorias: []},
        { nombre: 'Cubiertos', 
      categorias: []},
        { nombre: 'Cuchillos', 
      categorias: []},
        { nombre: 'Exprimidores manuales', 
      categorias: []},
        { nombre: 'Gabinetes', 
      categorias: []},
        { nombre: 'Molinos', 
      categorias: []},
        { nombre: 'Ollas a Presión', 
      categorias: []},
        { nombre: 'Ollas y Calderos', 
      categorias: []},
        { nombre: 'Planchas asadoras', 
      categorias: []},
        { nombre: 'Refractarias', 
      categorias: []},
        { nombre: 'Sartenes', 
      categorias: []},
        { nombre: 'Termos y Portacomidas', 
      categorias: []},
        { nombre: 'Utensilios', 
      categorias: []},
        { nombre: 'Vajillas', 
      categorias: []},
      ]
    },
    {
      nombre: 'Zona de Ropa',
      categorias: [
        {nombre: 'Mesas de planchar', categorias: []}
      ]
    },
    {
      nombre: 'Cuidado Personal',
      categorias: [
        { nombre: 'Planchas de Cabello', categorias: []},
        { nombre: 'Secadores de Cabello', categorias: []},
      ]
    }
  ];

  MARCAS: any[] = [
    {
      nombre: 'Abba',
      categorias: ['Estufas']
    },
    {
      nombre: 'Altezza',
      categorias: [
        'Ventiladores'
      ]
    },
    {
      nombre: 'Bionaire',
      categorias: [
        'Ventiladores'
      ]
    },
    {
      nombre: 'Black & Decker',
      categorias: [
        'Batidoras',
        'Extractores de jugos'
      ]
    },
    // {
    //   nombre: 'Bon Lari',
    //   categorias: []
    // },
    // {
    //   nombre: 'Breeze Line',
    //   categorias: []
    // },
    // {
    //   nombre: 'Certificado',
    //   categorias: []
    // },
    {
      nombre: 'Coldelec',
      categorias: [
        'Cafeteras y hervidoras'
      ]
    },
    {
      nombre: 'Continental',
      categorias: [
        'Estufas',
        'Exprimidores manuales',
        'Calderos'
      ]
    },
    {
      nombre: 'Corona',
      categorias: [
        'Ventiladores',
        'Ollas a Presión',
        'Planchas de ropa',
        'Molinos',
        'Cafeteras y hervidoras',
        'Procesadores de alimentos',
        'Calderos',
        'Licuadoras',
        'Sandwicheras',
        'Ollas Arroceras'
      ]
    },
    {
      nombre: 'Dkasa',
      categorias: [
        'Ventiladores',
        'Ollas Arroceras',
        'Procesadores de alimentos',
        'Calderos'
      ]
    },
    {
      nombre: 'G-Shark',
      categorias: [
        'Ventiladores'
      ]
    },
    // {
    //   nombre: 'Generico',
    //   categorias: []
    // },
    {
      nombre: 'Haceb',
      categorias: [
        'Estufas'
      ]
    },
    {
      nombre: 'Home Elements',
      categorias: [
        'Termos y Portacomidas',
        'Cubiertos',
        'Ventiladores',
        'Ollas a Presión',
        'Cafeteras y hervidoras',
        'Sandwicheras',
        'Extractores de jugos',
        'Licuadoras',
        'Loncheras',
        'Ollas Arroceras',
        'Planchas de ropa',
        'Sartenes',
        'Procesadores de alimentos',
        'Batidoras',
        'Cacerolas',
        'Chocolateras',
        'Estufas',
        'Exprimidores de cítricos',
        'Hornos',
        // 'Tostadoras',
        'Ollas y Calderos',
        'Básculas de cocina',
        'Calderos',
        'Baterías de cocina',
        'Refractarias'
      ]
    },
    {
      nombre: 'Imusa',
      categorias: [
        'Licuadoras',
        'Procesadores de alimentos',
        'Exprimidores de cítricos',
        'Batidoras',
        'Ollas a Presión',
        'Termos y Portacomidas',
        'Ollas y Calderos',
        'Sartenes',
        'Planchas asadoras',
        'Cacerolas',
        'Chocolateras',
        'Baterías de cocina'
      ]
    },
    {
      nombre: 'Incametal',
      categorias: [
        'Cuchillos',
        'Utensilios'
      ]
    },
    {
      nombre: 'India',
      categorias: [
        'Ollas a Presión'
      ]
    },
    {
      nombre: 'Kalley',
      categorias: [
        'Ventiladores',
        'Batidoras',
        'Cafeteras y hervidoras',
        'Planchas de ropa',
        'Extractores de jugos',
        'Dispensadores de agua',
        'Hornos',
        'Sandwicheras',
        'Aspiradoras',
        'Licuadoras',
        'Cuchillos'
      ]
    },
    {
      nombre: 'Oster',
      categorias: [
        'Planchas de ropa',
        'Licuadoras',
        // 'Cuchillos',
        'Cubiertos',
        'Batidoras',
        'Sandwicheras',
        'Cafeteras y hervidoras',
        'Extractores de jugos',
        'Procesadores de alimentos',
        'Ollas Arroceras',
        'Exprimidores de cítricos'
      ]
    },
    {
      nombre: 'Samurai',
      categorias: [
        'Ventiladores',
        'Licuadoras',
        'Planchas de ropa'
      ]
    },
    {
      nombre: 'Shimasu',
      categorias: [
        'Ventiladores'
      ]
    },
    // {
    //   nombre: 'Spring',
    //   categorias: []
    // },
    {
      nombre: 'Sueco',
      categorias: [
        'Estufas'
      ]
    },
    // {
    //   nombre: 'Umco',
    //   categorias: []
    // },
    {
      nombre: 'Universal',
      categorias: [
        'Ventiladores',
        'Ollas a Presión',
        'Sartenes',
        'Baterías de cocina',
        'Cacerolas',
        'Licuadoras',
        'Planchas de ropa',
        'Termos y Portacomidas',
        'Cafeteras y hervidoras',
        'Hornos',
        'Calderos',
        'Sandwicheras',
        'Ollas Arroceras',
        'Procesadores de alimentos',
        'Exprimidores de cítricos',
        'Planchas de Cabello',
        'Batidoras',
        'Cubiertos',
        'Asadores Eléctricos',
        'Ollas y Calderos',
      ]
    },
    {
      nombre: 'Vajillas Corona',
      categorias: [
        'Vajillas'
      ]
    },
    {
      nombre: 'Visivo',
      categorias: [
        'Hornos'
      ]
    },
    {
      nombre: 'Yamagas',
      categorias: [
        'Estufas'
      ]
    }
  ];

  constructor() { }
}
