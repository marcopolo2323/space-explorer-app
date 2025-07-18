// planetModal.jsx
import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DetailRow from './detailRow';
import { getPlanetImages } from './nasaApi';
import { styles } from './styles';

const PlanetModal = ({ planet, visible, onClose }) => {
  const [planetImages, setPlanetImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (visible && planet) {
      getPlanetImages(planet.name).then(setPlanetImages);
    } else {
      setPlanetImages([]);
      setSelectedImage(null);
    }
  }, [visible, planet]);

  if (!planet) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    > 
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={onClose}
        >
          <TouchableOpacity 
            style={styles.modalContent}
            activeOpacity={1}
            onPress={() => {}}
          >
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            
            <Image
              source={{ uri: planet.image }}
              style={styles.planetImage}
              resizeMode="cover"
            />

            {/* Galería de imágenes de la NASA */}
            {planetImages.length > 0 && (
              <>
                <Text style={styles.galleryTitle}>Imágenes de la NASA</Text>
                <ScrollView horizontal style={{ marginVertical: 10 }} showsHorizontalScrollIndicator={false}>
                  {planetImages.map((img, idx) => (
                    <TouchableOpacity key={idx} onPress={() => setSelectedImage(img)}>
                      <Image
                        source={{ uri: img }}
                        style={styles.galleryImage}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}
            
            <Text style={[styles.modalTitle, { color: planet.color }]}>
              {planet.name}
            </Text>
            
            <ScrollView style={styles.detailsContainer} showsVerticalScrollIndicator={false}>
              <DetailRow title="Distancia del Sol" value={planet.details.distanceFromSun} />
              <DetailRow title="Diámetro" value={planet.details.diameter} />
              <DetailRow title="Duración del día" value={planet.details.dayLength} />
              <DetailRow title="Duración del año" value={planet.details.yearLength} />
              <DetailRow title="Temperatura" value={planet.details.temperature} />
              <DetailRow title="Lunas" value={planet.details.moons} />
              <DetailRow title="Composición" value={planet.details.composition} />
              <DetailRow title="Atmósfera" value={planet.details.atmosphere} />
              
              <View style={styles.curiosityContainer}>
                <Text style={styles.curiosityTitle}>💫 Dato Curioso</Text>
                <Text style={styles.curiosityText}>{planet.details.curiosity}</Text>
              </View>
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      {/* Modal para mostrar la imagen en grande */}
      <Modal
        visible={!!selectedImage}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={{ position: 'absolute', top: 40, right: 30, zIndex: 2, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: 8 }}
            onPress={() => setSelectedImage(null)}
          >
            <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold' }}>✕</Text>
          </TouchableOpacity>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: '90%', height: '70%', borderRadius: 18, resizeMode: 'contain' }}
            />
          )}
        </View>
      </Modal>
    </Modal>
  );
};

export default PlanetModal;