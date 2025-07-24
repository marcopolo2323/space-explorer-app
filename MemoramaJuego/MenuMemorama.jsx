import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

export default function MenuPrincipal({ onIniciar, onRegresar }) {
  return (
    <ImageBackground
      source={require("@/components/Juegos/gusanoJuego/img/moon.jpg")}
      style={styles.fondo}
      resizeMode="cover"
    >
      <TouchableOpacity style={styles.botonRegresar} onPress={onRegresar}>
        <Text style={styles.textoRegresar}>← Volver</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.titulo}>🧠 MEMORAMA ESPACIAL</Text>

        <TouchableOpacity style={styles.boton} onPress={onIniciar}>
          <Text style={styles.texto}>🚀 Empezar Juego</Text>
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
    width:'100%'
  },
  botonRegresar: {
    position: "absolute",
    top: 30,
    left: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
  },
  textoRegresar: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  card: {
    backgroundColor: "transparent", // 🔍 sin opacidad oscura
    padding: 30,
    borderRadius: 20,
    width: "85%",
    alignItems: "center",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 24,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  boton: {
    backgroundColor: "#5c2fd4",
    padding: 14,
    borderRadius: 12,
    marginTop: 16,
    width: "100%",
    alignItems: "center",
  },
  texto: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});