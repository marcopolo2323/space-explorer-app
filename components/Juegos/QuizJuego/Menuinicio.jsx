import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";

export default function MenuInicio({ onIniciar, onIniciarPvp, onRegresar }) {
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
        <Text style={styles.titulo}>BIENVENIDO AL QUIZ</Text>

        <TouchableOpacity style={styles.boton} onPress={onIniciar}>
          <Text style={styles.texto}>Modo Solitario</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={onIniciarPvp}>
          <Text style={styles.texto}>Modo 1 vs 1</Text>
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
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 30,
    borderRadius: 20,
    width: "85%",
    alignItems: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 24,
  },
  boton: {
    backgroundColor: "#5c2fd4",
    padding: 14,
    borderRadius: 12,
    marginVertical: 8,
    width: "100%",
    alignItems: "center",
  },
  texto: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  botonRegresar: {
    alignSelf: "flex-start",
    backgroundColor: "#ddd",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
});
