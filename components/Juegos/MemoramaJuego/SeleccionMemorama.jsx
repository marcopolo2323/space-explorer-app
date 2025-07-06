import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

export default function SeleccionNivelMemorama({ onElegirNivel, onRegresar }) {
  const niveles = ["fácil", "medio", "difícil", "hard"];

  return (
    <ImageBackground
      source={require("../../../assets/Img/universo.jpg")}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.botonRegresar} onPress={onRegresar}>
          <Text style={styles.textoRegresar}>← Volver</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>🪐 Selecciona un Nivel</Text>
        <Text style={styles.subtitulo}>Pon a prueba tu memoria espacial</Text>

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
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "rgba(0,0,0,0.65)",
    padding: 30,
    borderRadius: 20,
    width: "85%",
    alignItems: "center",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 20,
    textAlign: "center",
  },
  boton: {
    backgroundColor: "#5c2fd4",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginVertical: 8,
    width: "100%",
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  texto: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  botonRegresar: {
    alignSelf: "flex-start",
    backgroundColor: "#444",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  textoRegresar: {
    color: "#ccc",
    fontSize: 16,
    fontWeight: "500",
  },
});