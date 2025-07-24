import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

export default function MenuPrincipal({ onSeleccionar }) {
  return (
    <ImageBackground
      source={require("@/components/Juegos/gusanoJuego/assest/god.jpg")}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.titulo}>🌌 EXPLORA EL UNIVERSO</Text>
        <Text style={styles.subtitulo}>JUGANDO</Text>

        <TouchableOpacity
          style={styles.boton}
          onPress={() => onSeleccionar("quiz")}
        >
          <Text style={styles.botonTitulo}>🚀 QUIZ ESPACIAL</Text>
          <Text style={styles.botonTexto}>
            Desafía tu mente con preguntas del universo.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.boton}
          onPress={() => onSeleccionar("memorama")}
        >
          <Text style={styles.botonTitulo}>🪐 MEMORAMA GALÁCTICO</Text>
          <Text style={styles.botonTexto}>
            Mejora tu memoria con cartas del espacio.
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.boton}
          onPress={() => onSeleccionar("gusano")}
        >
          <Text style={styles.botonTitulo}>🌌 GUSANO CÓSMICO</Text>
          <Text style={styles.botonTexto}>
            Come estrellas sin chocar contigo mismo.
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: '100%'
  },
  container: {
    width: "85%",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  titulo: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subtitulo: {
    color: "#ddd",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  boton: {
    backgroundColor: "#4B0082",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 12,
    width: "100%",
    alignItems: "center",
    elevation: 3,
  },
  botonTitulo: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginBottom: 6,
  },
  botonTexto: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
});
