import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const CATEGORIES = [
  { label: 'Galaxias', value: 'galaxy' },
  { label: 'Nebulosas', value: 'nebula' },
  { label: 'Estrellas', value: 'star' },
  { label: 'Astronautas', value: 'universe' },
  { label: 'Agujeros Negros', value: 'black hole' },
  { label: 'Planetas', value: 'planet' },
];
 
const SPACE_GRADIENT = ['#0f2027', '#2c5364', '#1a2980', '#000428'];
const STAR_COLOR = 'rgba(255,255,255,0.15)';

export default function UniverseGallery({ title, id, onRegresar }) {
  const [category, setCategory] = useState(CATEGORIES[0].value);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchImages = async (cat = category) => {
    setLoading(true);
    try {
      const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(cat)}&media_type=image`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al obtener imágenes');
      const data = await response.json();
      const items = data.collection.items.slice(0, 20); // Solo las primeras 20
      setImages(items);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudieron cargar las imágenes.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchImages(category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchImages(category);
  };

  const renderItem = ({ item }) => {
    const imgUrl = item.links && item.links[0] ? item.links[0].href : null;
    const title = item.data && item.data[0] ? item.data[0].title : '';
    const desc = item.data && item.data[0] ? item.data[0].description : '';
    return (
      <View style={styles.imageCard}>
        {imgUrl ? (
          <Image source={{ uri: imgUrl }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, { justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ color: '#fff' }}>Sin imagen</Text>
          </View>
        )}
        <Text style={styles.imageCaption}>{title}</Text>
        <Text style={styles.imageDesc} numberOfLines={3}>{desc}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={SPACE_GRADIENT} style={styles.background}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onRegresar} style={styles.backButton}>
            <Text style={styles.backText}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{title || 'Galería del Universo'}</Text>
        </View>
        <View style={styles.pickerContainer}>
          <Pressable onPress={() => setModalVisible(true)} style={styles.dropdownButton}>
            <Text style={styles.dropdownButtonText}>
              {CATEGORIES.find(cat => cat.value === category)?.label}
            </Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </Pressable>
          <Modal
            visible={modalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
              <View style={styles.modalContent}>
                {CATEGORIES.map(cat => (
                  <TouchableOpacity
                    key={cat.value}
                    style={[
                      styles.modalOption,
                      category === cat.value && styles.modalOptionSelected,
                    ]}
                    onPress={() => {
                      setCategory(cat.value);
                      setModalVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.modalOptionText,
                        category === cat.value && styles.modalOptionTextSelected,
                      ]}
                    >
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Pressable>
          </Modal>
        </View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0ff" />
            <Text style={styles.loadingText}>Cargando imágenes...</Text>
          </View>
        ) : (
          <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={item => item.data[0].nasa_id}
            contentContainerStyle={styles.gallery}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#0ff" />
            }
            ListEmptyComponent={
              <Text style={styles.emptyText}>No se encontraron imágenes.</Text>
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

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
    marginRight: 10,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
    textShadowColor: '#0ff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
  pickerContainer: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 16,
    marginHorizontal: 24,
    marginBottom: 12,
    marginTop: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: STAR_COLOR,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: 'rgba(20,30,60,0.7)',
    borderRadius: 16,
  },
  dropdownButtonText: {
    color: '#0ff',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  dropdownIcon: {
    color: '#0ff',
    fontSize: 16,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'rgba(20,30,60,0.97)',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 220,
    borderWidth: 1,
    borderColor: STAR_COLOR,
    shadowColor: '#0ff',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 4,
  },
  modalOptionSelected: {
    backgroundColor: 'rgba(0,255,255,0.12)',
  },
  modalOptionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  modalOptionTextSelected: {
    color: '#0ff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#0ff',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  gallery: {
    padding: 20,
    alignItems: 'center',
  },
  imageCard: {
    backgroundColor: 'rgba(20,30,60,0.7)',
    borderRadius: 20,
    marginBottom: 24,
    padding: 14,
    alignItems: 'center',
    width: 320,
    shadowColor: '#0ff',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    borderWidth: 1,
    borderColor: STAR_COLOR,
  },
  image: {
    width: 270,
    height: 180,
    borderRadius: 14,
    marginBottom: 10,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: STAR_COLOR,
  },
  imageCaption: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: 'bold',
    textShadowColor: '#0ff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  imageDesc: {
    color: '#b3e0ff',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 2,
    opacity: 0.85,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    opacity: 0.7,
    textShadowColor: '#0ff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
});