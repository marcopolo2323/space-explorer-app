// principal.jsx - Versión simplificada solo con datos de planetas
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
// Importa tus estilos existentes
import { styles } from './styles';
// Importa tus datos actualizados
import { planetsData } from './planetsData';
// Importa tus componentes existentes
import PlanetCard from './planetCard';
import PlanetModal from './planetModal';

const SolarSystemApp = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePlanetPress = (planet) => {
    setSelectedPlanet(planet);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPlanet(null);
  };

  // Verificación de seguridad
  if (!planetsData || !Array.isArray(planetsData) || planetsData.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Error</Text>
          <Text style={styles.subtitle}>No se pudieron cargar los datos de planetas</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌌 Sistema Solar</Text>
        <Text style={styles.subtitle}>Explora los planetas del sistema solar</Text>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {planetsData.map((planet) => (
          <PlanetCard
            key={planet.id}
            planet={planet}
            onPress={handlePlanetPress}
          />
        ))}
      </ScrollView>

      <PlanetModal
        planet={selectedPlanet}
        visible={modalVisible}
        onClose={closeModal}
      />
    </SafeAreaView>
  );
};

export default SolarSystemApp;