import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SeleccionNivel({ onElegirNivel, onRegresar }) {
  const niveles = ['fácil', 'medio', 'difícil', 'hard'];

  return (
    <ImageBackground
      source={require("../../../assets/Img/universo.jpg")}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.card}>
        <TouchableOpacity style={styles.botonRegresar} onPress={onRegresar}>
          <Text style={styles.textoRegresar}>⟵ Regresar</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Selecciona un Nivel</Text>
        {niveles.map((nivel) => (
          <TouchableOpacity
            key={nivel}
            style={styles.boton}
            onPress={() => onElegirNivel(nivel)}
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
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 30,
    borderRadius: 20,
    width: width * 0.85,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    color: 'white',
    marginBottom: 24,
    fontWeight: 'bold',
  },
  boton: {
    backgroundColor: '#5c2fd4',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  texto: {
    color: 'white',
    fontSize: 18,
  },
  botonRegresar: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    backgroundColor: '#444',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  textoRegresar: {
    color: 'white',
    fontSize: 14,
  },
});
