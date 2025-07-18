import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router'; // ← Importa useLocalSearchParams

const EpicImagesScreen = () => { // ← Elimina { route }
  const { title } = useLocalSearchParams(); // ← Usa useLocalSearchParams

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#3B82F6', '#1D4ED8']}
        style={styles.background}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{title || 'Epic Images'}</Text>
          <Text style={styles.subtitle}>
            Imágenes épicas de la Tierra desde el espacio
          </Text>
          <Text style={styles.emoji}>🌍</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 30,
  },
  emoji: {
    fontSize: 60,
  },
});

export default EpicImagesScreen;