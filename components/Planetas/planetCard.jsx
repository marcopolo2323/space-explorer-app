// planetCard.jsx
import React from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import { styles } from './styles';

const PlanetCard = ({ planet, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: planet.color + '20' }]}
      onPress={() => onPress(planet)}
      activeOpacity={0.8}
    >
        <Image
                    source={{ uri: planet.image }}
                    style={styles.planeta}
                    resizeMode="cover"
                  />
      <View style={styles.cardContent}>
        <Text style={styles.planetName}>{planet.name}</Text>
        <Text style={styles.planetDescription}>{planet.shortDescription}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlanetCard;