import React, { useEffect, useState } from 'react';

const planetasSistemaSolar = [
  {
    nombre: 'Mercurio',
    imagen: 'https://solarsystem.nasa.gov/system/feature_items/images/18_mercury_new.png',
  },
  {
    nombre: 'Venus',
    imagen: 'https://solarsystem.nasa.gov/system/feature_items/images/27_venus_jg.png',
  },
  {
    nombre: 'Tierra',
    imagen: 'https://solarsystem.nasa.gov/system/feature_items/images/17_earth.png',
  },
  {
    nombre: 'Marte',
    imagen: 'https://solarsystem.nasa.gov/system/feature_items/images/19_mars.png',
  },
  {
    nombre: 'Júpiter',
    imagen: 'https://solarsystem.nasa.gov/system/feature_items/images/16_jupiter_new.png',
  },
  {
    nombre: 'Saturno',
    imagen: 'https://solarsystem.nasa.gov/system/feature_items/images/28_saturn.png',
  },
  {
    nombre: 'Urano',
    imagen: 'https://solarsystem.nasa.gov/system/feature_items/images/29_uranus.png',
  },
  {
    nombre: 'Neptuno',
    imagen: 'https://solarsystem.nasa.gov/system/feature_items/images/30_neptune.png',
  },
];

const imagenExoplaneta = 'https://exoplanets.nasa.gov/internal_resources/372/'; // Imagen genérica de exoplaneta

const CardsPlanet = () => {
  const [exoplanetas, setExoplanetas] = useState([]);

  useEffect(() => {
    // Llamada a la API de exoplanetas de la NASA
    fetch('https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+top+10+pl_name+from+ps&format=json')
      .then((res) => res.json())
      .then((data) => {
        setExoplanetas(data);
      })
      .catch((err) => {
        setExoplanetas([]);
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Planetas del Sistema Solar</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {planetasSistemaSolar.map((planeta) => (
          <div key={planeta.nombre} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 10, width: 150, textAlign: 'center' }}>
            <img src={planeta.imagen} alt={planeta.nombre} style={{ width: 100, height: 100, objectFit: 'contain' }} />
            <div>{planeta.nombre}</div>
          </div>
        ))}
      </div>
      <h2 style={{ marginTop: 40 }}>Exoplanetas</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {exoplanetas.map((exo) => (
          <div key={exo.pl_name} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 10, width: 150, textAlign: 'center' }}>
            <img src={imagenExoplaneta} alt={exo.pl_name} style={{ width: 100, height: 100, objectFit: 'contain' }} />
            <div>{exo.pl_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsPlanet;
