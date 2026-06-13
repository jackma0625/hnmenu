
import { categories }
from './categories'


import { chineseTheme }
from './themes/chinese'

import { basicTheme }
from './themes/basic'

import { sushiTheme }
from './themes/sushi'

import { hongkongMenu }
from './menus/hongkong'

export const restaurants = [

  {

    id: 1,

    slug: 'sushi-yamato',

    name: 'Sushi Yamato',

    template: 'custom',

    theme: sushiTheme,

    category: categories[0],

    image:
      '/images/restaurants/sushi-yamato.webp',

    location: 'La Entrada, Copán',

    whatsapp: '50499999999',

    maps:
      'https://maps.google.com',

    hours: '11AM - 9PM',

    website:
      'https://sushiyamatohn.com',

    menu: [],

    menuImages: [],

  },

  {

    id: 2,

    slug: 'hong-kong-palace',

    name: 'Hong Kong Palace',

    template: 'premium',

    theme: chineseTheme,

    category: categories[0],

    image:
      '/images/restaurants/hongkong.webp',

    location: 'La Entrada, Copán',

    whatsapp: '50499977489',

    maps:
      'https://maps.app.goo.gl/TE9RbkKkvJrtDL5h8',

    hours: '10AM - 9PM',

    website: '',

    menu: hongkongMenu,

    menuImages: [],

  },

  {

    id: 3,

    slug: 'los-asado',

    name: 'Los Asado',

    template: 'basic',

    theme: basicTheme,

    category: categories[4],

    image:
      '/images/restaurants/asado.webp',

    location: 'La Entrada, Copán',

    whatsapp: '50499554602',

    maps:
      'https://maps.app.goo.gl/b2dAhUKJcuTo2MbM6',

    hours: '7AM - 9PM',

    website: '',

    menu: [],

    menuImages: [

      '/images/menus/asado1.webp',

    ],

  },


{

  id: 4,

  slug: 'rancho-grande',

  name: 'Rancho Grande',

  template: 'basic',

  theme: basicTheme,

  category: categories[4],

  image:
    '/images/restaurants/rancho-grande.webp',

  location: 'La Entrada, Copán',

  whatsapp: '50431797421',

  maps:
    'https://maps.google.com',

  hours: '7AM - 10PM',

  website: '',

  menu: [],

  menuImages: [],

},


]
