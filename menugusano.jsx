import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MenuGusano({ onIniciar, onRegresar }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gusano Galáctico</Text>

      <TouchableOpacity style={styles.button} onPress={onIniciar}>
        <Text style={styles.buttonText}>JUGAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onRegresar}>
        <Text style={styles.buttonText}>REGRESAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000'
  },
  title: {
    fontSize: 28, color: '#fff', marginBottom: 20
  },
  button: {
    backgroundColor: '#6cb7ef', padding: 15, marginVertical: 10, borderRadius: 10, width: '80%'
  },
  buttonText: {
    color: '#000', fontSize: 18, textAlign: 'center'
  }
});
