// inicio.js
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CuriosidadesCard from './curiosidades_card';
import { curiosidadesData } from './curiosidades_data';

const Inicio = ({ onCardPress }) => {
  const handleCardPress = (item) => {
    console.log('Navegando internamente a:', item.screenName, 'con título:', item.title);
    onCardPress(item);
  };

  const renderCard = ({ item }) => (
    <CuriosidadesCard item={item} onPress={handleCardPress} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#0F172A', '#1E293B', '#334155']}
        style={styles.background}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>CURIOSIDADES DEL</Text>
          <Text style={styles.headerSubtitle}>UNIVERSO</Text>
        </View>

        <FlatList
          data={curiosidadesData}
          renderItem={renderCard}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

// Mantén los mismos estilos...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1026',
  },
  background: {
    flex: 1,
    borderRadius: 0,
    // Degradado sutil, el LinearGradient ya lo aplica
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    borderRadius: 0,
    marginHorizontal: 0,
    // Sin sombras ni efectos
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e0e7ff',
    textAlign: 'center',
    letterSpacing: 2,
    // Sin sombra ni glow
  },
  headerSubtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#a5b4fc',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 10,
    // Sin sombra ni glow
  },
  listContainer: {
    paddingBottom: 30,
    paddingHorizontal: 8,
  },
});

export default Inicio;