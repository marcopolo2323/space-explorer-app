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
      source={require("@/assets/Img/universo.jpg")}
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
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  titulo: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitulo: {
    color: "#ccc",
    fontSize: 18,
    marginBottom: 24,
    textAlign: "center",
  },
  boton: {
    backgroundColor: "#5c2fd4",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
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
