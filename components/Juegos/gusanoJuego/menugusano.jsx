import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window'); // 🧠 adaptar al tamaño del dispositivo

export default function MenuGusano({ onIniciar, onRegresar }) {
  return (
    <ImageBackground
      source={require('./assest/planet.png')}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>🌌 Gusano Galáctico</Text>

        <TouchableOpacity style={styles.button} onPress={onIniciar}>
          <Text style={styles.buttonText}>🚀 JUGAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary} onPress={onRegresar}>
          <Text style={styles.buttonText}>⏎ REGRESAR</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
   fondo: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: 'rgba(0,0,0,0.6)', // 🌌 semi-transparente encima del fondo
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#5ecdf0',
    textAlign: 'center',
    textShadowColor: '#1a1a1a',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#5ecdf0',
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 12,
    borderRadius: 12,
    width: '80%',
    shadowColor: '#5ecdf0',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonSecondary: {
    backgroundColor: '#222',
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 12,
    borderRadius: 12,
    width: '80%',
    borderWidth: 1,
    borderColor: '#5ecdf0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});