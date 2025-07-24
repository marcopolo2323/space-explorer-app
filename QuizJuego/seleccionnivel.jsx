import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function SeleccionNivel({ onElegirNivel, onRegresar }) {
  const niveles = ['fácil', 'medio', 'difícil', 'hard'];

  return (
    <ImageBackground
      source={require("@/components/Juegos/gusanoJuego/assest/menuquiz.jpg")}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.card}>
        <TouchableOpacity style={styles.botonRegresar} onPress={onRegresar}>
          <Text style={styles.textoRegresar}>⟵ Regresar</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>🌌 Selecciona un Nivel</Text>

        {niveles.map((nivel) => (
          <TouchableOpacity
            key={nivel}
            style={styles.boton}
            onPress={() => onElegirNivel(nivel)}
          >
            <Text style={styles.textoNivel}>{nivel.toUpperCase()}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'transparent',
    padding: 32,
    borderRadius: 24,
    width: width * 0.85,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  titulo: {
    fontSize: 28,
    color: '#ffffff',
    marginBottom: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boton: {
    backgroundColor: '#6e33a1',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 14,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    elevation: 2,
  },
  textoNivel: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  botonRegresar: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  textoRegresar: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});