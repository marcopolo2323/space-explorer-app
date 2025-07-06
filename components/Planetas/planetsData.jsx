export const planetsData = [
  {
    id: 1,
    name: 'Mercurio',
    shortDescription: 'El planeta más cercano al Sol',
    color: '#8C7853',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/480px-Mercury_in_true_color.jpg',
    nasaSearchTerm: 'Mercury planet', // Solo agregamos esto
    details: {
      distanceFromSun: '58 millones km',
      diameter: '4,879 km',
      dayLength: '59 días terrestres',
      yearLength: '88 días terrestres',
      temperature: '-173°C a 427°C',
      moons: '0',
      composition: 'Núcleo de hierro, corteza rocosa',
      atmosphere: 'Prácticamente inexistente',
      curiosity: 'Un día en Mercurio dura más que un año mercuriano'
    }
  },
  {
    id: 2,
    name: 'Venus',
    shortDescription: 'El planeta más caliente',
    color: '#FFC649',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Venus_from_Mariner_10.jpg/480px-Venus_from_Mariner_10.jpg',
    nasaSearchTerm: 'Venus planet',
    details: {
      distanceFromSun: '108 millones km',
      diameter: '12,104 km',
      dayLength: '243 días terrestres',
      yearLength: '225 días terrestres',
      temperature: '462°C promedio',
      moons: '0',
      composition: 'Rocoso con atmósfera densa',
      atmosphere: '96% dióxido de carbono',
      curiosity: 'Gira en dirección opuesta a la mayoría de planetas'
    }
  },
  {
    id: 3,
    name: 'Tierra',
    shortDescription: 'Nuestro hogar',
    color: '#6B93D6',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/480px-The_Earth_seen_from_Apollo_17.jpg',
    nasaSearchTerm: 'Earth from space',
    details: {
      distanceFromSun: '150 millones km',
      diameter: '12,756 km',
      dayLength: '24 horas',
      yearLength: '365.25 días',
      temperature: '-89°C a 58°C',
      moons: '1 (Luna)',
      composition: 'Rocoso con 71% de superficie cubierta por agua',
      atmosphere: '78% nitrógeno, 21% oxígeno',
      curiosity: 'El único planeta conocido con vida'
    }
  },
  {
    id: 4,
    name: 'Marte',
    shortDescription: 'El planeta rojo',
    color: '#CD5C5C',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/480px-OSIRIS_Mars_true_color.jpg',
    nasaSearchTerm: 'Mars planet',
    hasMarsPhotos: true,
    details: {
      distanceFromSun: '228 millones km',
      diameter: '6,792 km',
      dayLength: '24.6 horas',
      yearLength: '687 días terrestres',
      temperature: '-87°C a -5°C',
      moons: '2 (Fobos y Deimos)',
      composition: 'Rocoso con óxido de hierro en superficie',
      atmosphere: '95% dióxido de carbono',
      curiosity: 'Tiene el volcán más grande del sistema solar: Monte Olimpo'
    }
  },
  {
    id: 5,
    name: 'Júpiter',
    shortDescription: 'El gigante gaseoso',
    color: '#D8CA9D',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/480px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg',
    nasaSearchTerm: 'Jupiter planet',
    details: {
      distanceFromSun: '778 millones km',
      diameter: '142,984 km',
      dayLength: '9.9 horas',
      yearLength: '12 años terrestres',
      temperature: '-108°C promedio',
      moons: '95+ conocidas',
      composition: 'Principalmente hidrógeno y helio',
      atmosphere: 'Hidrógeno y helio con trazas de metano',
      curiosity: 'Su Gran Mancha Roja es una tormenta más grande que la Tierra'
    }
  },
  {
    id: 6,
    name: 'Saturno',
    shortDescription: 'El señor de los anillos',
    color: '#FAD5A5',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/480px-Saturn_during_Equinox.jpg',
    nasaSearchTerm: 'Saturn planet',
    details: {
      distanceFromSun: '1,432 millones km',
      diameter: '120,536 km',
      dayLength: '10.7 horas',
      yearLength: '29 años terrestres',
      temperature: '-139°C promedio',
      moons: '146+ conocidas',
      composition: 'Principalmente hidrógeno y helio',
      atmosphere: 'Hidrógeno y helio',
      curiosity: 'Es menos denso que el agua, flotaría en un océano gigante'
    }
  },
  {
    id: 7,
    name: 'Urano',
    shortDescription: 'El gigante de hielo',
    color: '#4FD0E7',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/480px-Uranus2.jpg',
    nasaSearchTerm: 'Uranus planet',
    details: {
      distanceFromSun: '2,867 millones km',
      diameter: '51,118 km',
      dayLength: '17.2 horas',
      yearLength: '84 años terrestres',
      temperature: '-197°C promedio', 
      moons: '27 conocidas',
      composition: 'Agua, metano y hielo de amoníaco',
      atmosphere: 'Hidrógeno, helio y metano',
      curiosity: 'Gira de lado, con una inclinación de 98 grados'
    }
  },
  {
    id: 8,
    name: 'Neptuno',
    shortDescription: 'El mundo ventoso',
    color: '#4B70DD',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg/480px-Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg',
    nasaSearchTerm: 'Neptune planet',
    details: {
      distanceFromSun: '4,515 millones km',
      diameter: '49,528 km',
      dayLength: '16.1 horas',
      yearLength: '165 años terrestres',
      temperature: '-201°C promedio',
      moons: '16+ conocidas',
      composition: 'Agua, metano y hielo de amoníaco',
      atmosphere: 'Hidrógeno, helio y metano',
      curiosity: 'Tiene los vientos más rápidos del sistema solar: hasta 2,100 km/h'
    }
  }
];