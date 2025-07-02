// principal.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { styles } from './styles';
import { planetsData } from './planetsData';
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌌 Sistema Solar</Text>
        <Text style={styles.subtitle}>Explora los planetas de nuestro sistema</Text>
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