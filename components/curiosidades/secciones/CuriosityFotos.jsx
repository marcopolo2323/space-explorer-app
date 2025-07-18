import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { nasaApiService } from '../../Planetas/nasaApi';

const SPACE_GRADIENT = ['#0f2027', '#2c5364', '#1a2980', '#000428'];
const STAR_COLOR = 'rgba(255,255,255,0.15)';

export default function CuriosityFotos({ title, id, onRegresar }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
 
  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const data = await nasaApiService.getMarsPhotos();
      setPhotos(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las fotos.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPhotos();
  };

  const renderItem = ({ item }) => (
    <View style={styles.photoCard}>
      <Image source={{ uri: item.img_src }} style={styles.photo} resizeMode="cover" />
      <View style={styles.photoInfo}>
        <Text style={styles.photoText}>Cámara: {item.camera.full_name}</Text>
        <Text style={styles.photoText}>Fecha: {item.earth_date}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={SPACE_GRADIENT}
        style={styles.background}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onRegresar} style={styles.backButton}>
            <Text style={styles.backText}>← Volver</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{title || 'Curiosity Fotos'}</Text>
          <Text style={styles.id}>ID: {id}</Text>
          <Text style={styles.subtitle}>
            Fotos reales enviadas por el rover Curiosity desde Marte
          </Text>
          {loading ? (
            <ActivityIndicator size="large" color="#0ff" style={{ marginTop: 40 }} />
          ) : (
            <FlatList
              data={photos}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              numColumns={2}
              contentContainerStyle={styles.gallery}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#0ff" />
              }
              ListEmptyComponent={<Text style={styles.emptyText}>No hay fotos disponibles.</Text>}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </LinearGradient> 
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - 64) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    padding: 24,
    paddingTop: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: STAR_COLOR,
    backgroundColor: 'rgba(10,10,30,0.4)',
    shadowColor: '#0ff',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  backText: {
    color: '#0ff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: '#0ff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
  id: {
    fontSize: 16,
    color: '#b3e0ff',
    marginBottom: 10,
    textAlign: 'center',
    opacity: 0.85,
  },
  subtitle: {
    fontSize: 16,
    color: '#b3e0ff',
    textAlign: 'center',
    marginBottom: 10,
    opacity: 0.85,
  },
  gallery: {
    paddingBottom: 30,
    paddingTop: 10,
    alignItems: 'center',
  },
  photoCard: {
    backgroundColor: 'rgba(20,30,60,0.7)',
    borderRadius: 20,
    margin: CARD_MARGIN,
    width: CARD_WIDTH,
    overflow: 'hidden',
    elevation: 2,
    borderWidth: 1,
    borderColor: STAR_COLOR,
    shadowColor: '#0ff',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
  },
  photo: {
    width: '100%',
    height: CARD_WIDTH * 0.9,
    backgroundColor: '#111',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: STAR_COLOR,
  },
  photoInfo: {
    padding: 8,
  },
  photoText: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 2,
    textAlign: 'center',
    textShadowColor: '#0ff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
    opacity: 0.7,
    textShadowColor: '#0ff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
});