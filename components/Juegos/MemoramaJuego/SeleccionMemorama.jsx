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
      source={require("@/components/Juegos/gusanoJuego/img/cosmo.jpg")}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.card}>
        <TouchableOpacity style={styles.volver} onPress={onRegresar}>
          <Text style={styles.volverTexto}>← Volver al selector</Text>
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
    width:'100%'
  },
  card: {
    backgroundColor: "transparent", // 💫 sin opacidad oscura
    padding: 30,
    borderRadius: 24,
    width: "85%",
    alignItems: "center",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitulo: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 24,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 3,
  },
  texto: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  volver: {
    alignSelf: "flex-start",
    marginBottom: 12,
    backgroundColor: "#222",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  volverTexto: {
    color: "#5c2fd4",
    fontSize: 14,
    fontWeight: "bold",
  },
});
