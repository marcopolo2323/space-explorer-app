import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default function SeleccionNivelPvP({ onSeleccionarNivel, onRegresar }) {
  const niveles = ['fácil', 'medio', 'difícil', 'hard'];

  return (
    <ImageBackground
      source={require("../../../assets/Img/universo.jpg")}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.botonRegresar} onPress={onRegresar}>
            <Text style={styles.texto}>Regresar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Modo 1 vs 1</Text>
        <Text style={styles.subtitulo}>Selecciona el nivel para jugar</Text>

        {niveles.map((nivel) => (
          <TouchableOpacity
            key={nivel}
            style={styles.boton}
            onPress={() => onSeleccionarNivel(nivel)}
          >
            <Text style={styles.texto}>{nivel.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 30,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  subtitulo: {
    fontSize: 16,
    color: 'white',
    marginBottom: 24,
  },
  boton: {
    backgroundColor: '#5c2fd4',
    padding: 14,
    borderRadius: 12,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  texto: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  botonRegresar: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    backgroundColor: '#5c2fd499',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
},
});
