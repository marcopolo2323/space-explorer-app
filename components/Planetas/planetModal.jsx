// planetModal.jsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import { styles } from './styles';
import DetailRow from './detailRow';

const PlanetModal = ({ planet, visible, onClose }) => {
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
    </Modal>
  );
};

export default PlanetModal;