// nasaApi.js - Versión simplificada
const NASA_API_KEY = 'gRVZ1ecthz3ERGd2looBcgbrZp4h7lp20q2Zifpr'; // Reemplaza con tu clave
const NASA_BASE_URL = 'https://api.nasa.gov';

export const nasaApiService = {
  async getAstronomyPictureOfDay() {
    try {
      const response = await fetch(
        `${NASA_BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Error al obtener APOD');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching APOD:', error);
      return null;
    }
  },

  async getMarsPhotos(sol = 1000) {
    try {
      const response = await fetch(
        `${NASA_BASE_URL}/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&camera=FHAZ&api_key=${NASA_API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Error al obtener fotos de Marte');
      }
      const data = await response.json();
      return data.photos || [];
    } catch (error) {
      console.error('Error fetching Mars photos:', error);
      return [];
    }
  }
};

// Buscar imágenes de un planeta específico
export async function getPlanetImages(planetName) {
  try {
    const response = await fetch(
      `https://images-api.nasa.gov/search?q=${encodeURIComponent(planetName)}&media_type=image`
    );
    const data = await response.json();
    // Devuelve solo las primeras 5 imágenes relevantes
    return data.collection.items.slice(0, 5).map(item => item.links[0].href);
  } catch (error) {
    console.error('Error fetching planet images:', error);
    return [];
  }
}