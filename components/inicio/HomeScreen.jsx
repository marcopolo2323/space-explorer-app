// app/index.tsx (pantalla de inicio con API de NASA)
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Configura tu API key de NASA aquí
const NASA_API_KEY = 'gRVZ1ecthz3ERGd2looBcgbrZp4h7lp20q2Zifpr'; // Reemplaza con tu API key real

// Mueve esta función fuera del componente para evitar redefiniciones
function getCurrentDateTime() {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear().toString().slice(-2); 
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export default function HomeScreen() {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(getCurrentDateTime());
  const [modalVisible, setModalVisible] = useState(false); // <-- nuevo estado

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
    fetchAPODData();
    
    // Actualizar la hora inmediatamente y cada minuto
    const updateTime = () => {
      setCurrentDate(getCurrentDateTime());
    };
    
    // Primera actualización
    updateTime();
    
    // Configurar el intervalo para actualizar cada minuto
    const interval = setInterval(updateTime, 60000);
    
    // Limpiar el intervalo cuando el componente se desmonte
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []); // Solo se ejecuta una vez al montar el componente

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
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f23" />
      {/* Modal para imagen en tamaño completo */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
            <ImageBackground
              source={{ uri: apodData?.url }}
              style={styles.fullImage}
              imageStyle={{ resizeMode: 'contain', borderRadius: 24 }}
            >
              <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </Pressable>
            </ImageBackground>
          </Pressable>
        </View>
      </Modal>
      {/* Background with stars effect */}
      <LinearGradient
        colors={['#0f0f23', '#1a1a2e', '#16213e']}
        style={styles.background}
      >
        {/* Header Mejorado */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.logoContainer}
              onPress={handleRefreshData}
              activeOpacity={0.7}
            >
              <Image
                source={{ uri: 'https://res.cloudinary.com/davbpytad/image/upload/v1752686126/logo_inkanazca_z46jd1.png' }}
                style={styles.logo}
              />
              <Text style={styles.appName}>INKANAZCA</Text>
            </TouchableOpacity>
            <Text style={styles.dateTime}>{currentDate}</Text>
          </View>
        </View>

        {/* Scrollable Main Content */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.mainContent}>
            <Text style={styles.mainTitle}>EXPLORA EL UNIVERSO</Text>
            {/* NASA APOD Image Container con efecto glassmorphism */}
            <View style={styles.imageContainer}>
              {apodData && apodData.media_type === 'image' && (
                <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.8}>
                  <ImageBackground
                    source={{ uri: apodData.url }}
                    style={styles.nebulaImage}
                    imageStyle={styles.imageStyle}
                  >
                    <LinearGradient
                      colors={['rgba(30,30,60,0.7)', 'rgba(30,30,60,0.2)', 'rgba(30,30,60,0.7)']}
                      style={styles.imageOverlay}
                    />
                  </ImageBackground>
                </TouchableOpacity>
              )}
              {/* Image Label */}
              <View style={styles.imageLabel}>
                <Text style={styles.imageLabelText}>
                  {apodData && apodData.title ? apodData.title.toLowerCase() : 'imagen del día de nasa'}
                </Text>
                <Text style={styles.imageDateText}>NASA APOD - {apodData && apodData.date ? apodData.date : ''}</Text>
              </View>
            </View>

            {/* NASA Description Text Mejorado */}
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

            {/* Start Button Mejorado */}
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
        </ScrollView>

        {/* Footer profesional fuera del ScrollView */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 INKANAZCA · Powered by NASA API
          </Text>
        </View>

        {/* Decorative Stars */}
        <View style={styles.starsContainer} pointerEvents="none">
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  background: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 8,
    paddingHorizontal: 24,
    paddingBottom: 18,
    backgroundColor: 'rgba(20,20,40,0.7)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: width * 0.55,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 5,
  },
  appName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textShadowColor: '#7b68ee',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  dateTime: {
    color: '#cccccc',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 8,
    flexShrink: 1,
    textAlign: 'right',
    maxWidth: width * 0.35,
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
    marginTop: 10,
    marginBottom: 10,
  },
  mainTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: 2,
    textShadowColor: '#4a6fa5',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    paddingHorizontal: 10,
    flexShrink: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  nebulaImage: {
    width: width * 0.88,
    height: 230,
    justifyContent: 'flex-end',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 10,
  },
  imageStyle: {
    borderRadius: 24,
  },
  imageOverlay: {
    flex: 1,
    borderRadius: 24,
  },
  imageLabel: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 22,
    marginTop: -32,
    zIndex: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  imageLabelText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
  },
  imageDateText: {
    color: '#7b68ee',
    fontSize: 13,
    marginTop: 2,
    textAlign: 'center',
    fontWeight: '600',
  },
  descriptionContainer: {
    marginBottom: 32,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(30,30,60,0.45)',
    borderRadius: 18,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  descriptionTitle: {
    color: '#7b68ee',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 1,
  },
  descriptionText: {
    color: '#cccccc',
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'justify',
    fontWeight: '500',
  },
  readMoreText: {
    color: '#4a6fa5',
    fontSize: 15,
    marginTop: 7,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  startButton: {
    alignSelf: 'center',
    borderRadius: 32,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#7b68ee',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    marginBottom: 18,
    marginTop: 8,
  },
  buttonGradient: {
    paddingHorizontal: 48,
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 32,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    textShadowColor: '#4a6fa5',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  nasaAttribution: {
    color: '#aaa',
    fontSize: 13,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 2,
  },
  footer: {
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: 'rgba(20,20,40,0.7)',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  footerText: {
    color: '#aaa',
    fontSize: 13,
    fontStyle: 'italic',
    letterSpacing: 0.5,
    textAlign: 'center',
    width: '100%',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: width * 0.95,
    height: height * 0.7,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 24,
    overflow: 'hidden',
  },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 22,
    marginBottom: 24,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 24,
  },
});