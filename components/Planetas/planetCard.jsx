// planetCard.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const PlanetCard = ({ planet, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: planet.color + '20' }]}
      onPress={() => onPress(planet)}
      activeOpacity={0.8}
    >
      <View style={[styles.planetCircle, { backgroundColor: planet.color }]}>
        <Text style={styles.planetInitial}>{planet.name[0]}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.planetName}>{planet.name}</Text>
        <Text style={styles.planetDescription}>{planet.shortDescription}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlanetCard;