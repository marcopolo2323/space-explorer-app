// app/index.tsx (pantalla de inicio con API de NASA)
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

// Configura tu API key de NASA aquí
const NASA_API_KEY = 'gRVZ1ecthz3ERGd2looBcgbrZp4h7lp20q2Zifpr'; // Reemplaza con tu API key real

export default function HomeScreen() {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState('');

  // Función para obtener la fecha y hora actual formateada
  const getCurrentDateTime = () => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString().slice(-2);
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // Función para obtener datos de APOD (Astronomy Picture of the Day)
  const fetchAPODData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Error al obtener datos de NASA');
      }
      
      const data = await response.json();
      setApodData(data);
    } catch (error) {
      console.error('Error fetching NASA APOD:', error);
      Alert.alert(
        'Error',
        'No se pudieron cargar los datos de NASA. Usando contenido de ejemplo.',
        [{ text: 'OK' }]
      );
      
      // Datos de fallback
      setApodData({
        title: 'Nebulosa de Orión',
        explanation: 'Una de las nebulosas más brillantes y fotografiadas del cielo nocturno, ubicada en la constelación de Orión. Esta región de formación estelar activa contiene estrellas jóvenes y calientes que iluminan el gas y polvo circundante.',
        url: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=250&fit=crop',
        date: new Date().toISOString().split('T')[0],
        media_type: 'image'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentDate(getCurrentDateTime());
    fetchAPODData();
    
    // Actualizar la hora cada minuto
    const interval = setInterval(() => {
      setCurrentDate(getCurrentDateTime());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const handleStartExploration = () => {
    router.push('/(tabs)/planetas');
  };

  const handleRefreshData = () => {
    fetchAPODData();
  };

  // Función para truncar texto largo
  const truncateText = (text, maxLength = 200) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0f0f23" />
        <LinearGradient
          colors={['#0f0f23', '#1a1a2e', '#16213e']}
          style={[styles.background, styles.centered]}
        >
          <ActivityIndicator size="large" color="#7b68ee" />
          <Text style={styles.loadingText}>Cargando datos de NASA...</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f23" />
      
      {/* Background with stars effect */}
      <LinearGradient
        colors={['#0f0f23', '#1a1a2e', '#16213e']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.logoContainer}
              onPress={handleRefreshData}
              activeOpacity={0.7}
            >
              <View style={styles.planetIcon} />
              <Text style={styles.appName}>INKANAZCA</Text>
            </TouchableOpacity>
            <Text style={styles.dateTime}>{currentDate}</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={styles.mainTitle}>EXPLORA EL UNIVERSO</Text>
          
          {/* NASA APOD Image Container */}
          <View style={styles.imageContainer}>
            {apodData && apodData.media_type === 'image' && (
              <ImageBackground
                source={{ uri: apodData.url }}
                style={styles.nebulaImage}
                imageStyle={styles.imageStyle}
              >
                <LinearGradient
                  colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
                  style={styles.imageOverlay}
                />
              </ImageBackground>
            )}
            
            {/* Image Label */}
            <View style={styles.imageLabel}>
              <Text style={styles.imageLabelText}>
                {apodData && apodData.title ? apodData.title.toLowerCase() : 'imagen del día de nasa'}
              </Text>
              <Text style={styles.imageDateText}>NASA APOD - {apodData && apodData.date ? apodData.date : ''}</Text>
            </View>
          </View>

          {/* NASA Description Text */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Descripción NASA:</Text>
            <Text style={styles.descriptionText}>
              {apodData && apodData.explanation 
                ? truncateText(apodData.explanation)
                : 'Cargando descripción de NASA...'
              }
            </Text>
            
            {apodData && apodData.explanation && apodData.explanation.length > 200 && (
              <TouchableOpacity onPress={() => {
                Alert.alert(
                  apodData.title,
                  apodData.explanation,
                  [{ text: 'Cerrar' }]
                );
              }}>
                <Text style={styles.readMoreText}>Leer más...</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Start Button */}
          <TouchableOpacity 
            style={styles.startButton}
            onPress={handleStartExploration}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#4a6fa5', '#7b68ee']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>COMENZAR EXPLORACIÓN</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* NASA Attribution */}
          <Text style={styles.nasaAttribution}>
            Datos proporcionados por NASA API
          </Text>
        </View>

        {/* Decorative Stars */}
        <View style={styles.starsContainer}>
          {[...Array(30)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.star,
                {
                  top: Math.random() * height,
                  left: Math.random() * width,
                  opacity: Math.random() * 0.8 + 0.2,
                  transform: [
                    { scale: Math.random() * 1.5 + 0.5 }
                  ]
                }
              ]}
            />
          ))}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planetIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4a6fa5',
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#7b68ee',
  },
  appName: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateTime: {
    color: '#cccccc',
    fontSize: 14,
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  mainTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 2,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  nebulaImage: {
    width: width * 0.85,
    height: 220,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 15,
  },
  imageOverlay: {
    flex: 1,
    borderRadius: 15,
  },
  imageLabel: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: -30,
    zIndex: 2,
    alignItems: 'center',
  },
  imageLabelText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  imageDateText: {
    color: '#7b68ee',
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
  },
  descriptionContainer: {
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  descriptionTitle: {
    color: '#7b68ee',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionText: {
    color: '#cccccc',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'justify',
  },
  readMoreText: {
    color: '#4a6fa5',
    fontSize: 14,
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  startButton: {
    alignSelf: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#7b68ee',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginBottom: 15,
  },
  buttonGradient: {
    paddingHorizontal: 40,
    paddingVertical: 18,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  nasaAttribution: {
    color: '#888888',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  starsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  star: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: '#ffffff',
    borderRadius: 1,
  },
});