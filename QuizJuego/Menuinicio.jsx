import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function MenuInicio({ onIniciar, onIniciarPvp, onRegresar }) {
  return (
    <ImageBackground
      source={require("@/components/Juegos/gusanoJuego/assest/aura.jpg")}
      style={styles.fondo}
      resizeMode="cover"
    >
      <TouchableOpacity style={styles.botonRegresar} onPress={onRegresar}>
        <Text style={styles.textoRegresar}>← Volver</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.titulo}>🌠 BIENVENIDO AL QUIZ</Text>

        <TouchableOpacity style={styles.boton} onPress={onIniciar}>
          <Text style={styles.texto}>🧠 Modo Solitario</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={onIniciarPvp}>
          <Text style={styles.texto}>⚔️ Modo 1 vs 1</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  botonRegresar: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  textoRegresar: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  container: {
    backgroundColor: "transparent",
    padding: 30,
    borderRadius: 20,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 28,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  boton: {
    backgroundColor: "#5c2fd4",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
    elevation: 2,
  },
  texto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});