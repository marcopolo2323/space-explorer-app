export const NASA_API_KEY = 'gRVZ1ecthz3ERGd2looBcgbrZp4h7lp20q2Zifpr';
export const GOOGLE_TRANSLATE_API_KEY = ''; // Aquí deberás colocar tu API key de Google Cloud Translation

// Función de ayuda para traducir texto
export async function translateText(text, targetLanguage = 'es') {
  if (!GOOGLE_TRANSLATE_API_KEY) {
    console.warn('Google Translate API key no configurada');
    return text;
  }

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLanguage,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Error en la traducción');
    }

    const data = await response.json();
    return data.data.translations[0].text;
  } catch (error) {
    console.error('Error al traducir:', error);
    return text; // Retorna el texto original si hay un error
  }
} 