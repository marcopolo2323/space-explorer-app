import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router'; // ← Importa useLocalSearchParams

const CuriosityFotosScreen = () => { // ← Elimina { route }
  const { title } = useLocalSearchParams(); // ← Usa useLocalSearchParams

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#8B5CF6', '#3B82F6']}
        style={styles.background}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{title || 'Curiosity Fotos'}</Text>
          <Text style={styles.subtitle}>
            Aquí se mostrarán las fotos del rover Curiosity
          </Text>
          <Text style={styles.emoji}>🚀</Text>
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

export default CuriosityFotosScreen;