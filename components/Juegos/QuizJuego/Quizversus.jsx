import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Animated,
} from "react-native";

import preguntasFacil from "../QuizJuego/Preguntas/facil";
import preguntasMedio from "../QuizJuego/Preguntas/normal";
import preguntasDificil from "../QuizJuego/Preguntas/dificil";
import preguntasHard from "../QuizJuego/Preguntas/hard";

export default function PvPQuiz({ nivel, onRegresar }) {
  const [preguntas, setPreguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [puntajeJ1, setPuntajeJ1] = useState(0);
  const [puntajeJ2, setPuntajeJ2] = useState(0);
  const [turno, setTurno] = useState(1);
  const [terminado, setTerminado] = useState(false);
  const animacionBarra = useRef(new Animated.Value(0)).current;
  const tiempoRef = useRef(null);
  const progresoTiempo = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let seleccionadas;
    switch (nivel) {
      case "fácil": seleccionadas = preguntasFacil; break;
      case "medio": seleccionadas = preguntasMedio; break;
      case "difícil": seleccionadas = preguntasDificil; break;
      case "hard": seleccionadas = preguntasHard; break;
      default: seleccionadas = preguntasFacil;
    }
    const barajadas = [...seleccionadas].sort(() => 0.5 - Math.random()).slice(0, 10);
    setPreguntas(barajadas);
  }, [nivel]);

 useEffect(() => {
  if (nivel === "difícil" || nivel === "hard") {
    progresoTiempo.setValue(1); // reinicia barra
    Animated.timing(progresoTiempo, {
      toValue: 0,
      duration: 10000,
      useNativeDriver: false,
    }).start();

    tiempoRef.current = setTimeout(() => {
      manejarSeleccion(null); // ⏰ respuesta automática
    }, 10000);
  }

  return () => clearTimeout(tiempoRef.current);
}, [indice]);


  const manejarSeleccion = (opcion) => {
    const correcta = preguntas[indice].respuestaCorrecta;
    const acierto = opcion === correcta;

    if (turno === 1 && acierto) setPuntajeJ1((p) => p + 1);
    if (turno === 2 && acierto) setPuntajeJ2((p) => p + 1);

    setSeleccion(opcion);

    setTimeout(() => {
      setSeleccion(null);
      if (indice + 1 < 10) {
        setIndice(indice + 1);
        setTurno(turno === 1 ? 2 : 1);
      } else {
        setTerminado(true);
      }
    }, 1000);
  };

  const actual = preguntas[indice];
  if (!actual) return null;

  return (
    <ImageBackground
  source={require("@/components/Juegos/gusanoJuego/assest/const.jpg")}
  style={styles.fondo}
  resizeMode="cover"
>
  <View style={styles.tarjeta}>
    {/* 🔙 Botón para volver al selector */}
    <TouchableOpacity style={styles.volver} onPress={onRegresar}>
      <Text style={styles.volverTexto}>← Volver al selector</Text>
    </TouchableOpacity>

    {/* ⏳ Barra de tiempo para niveles difíciles */}
    {(nivel === "difícil" || nivel === "hard") && (
      <View style={styles.barraContenedor}>
        <Animated.View
          style={[
            styles.barraProgreso,
            {
              width: progresoTiempo.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
    )}

    {terminado ? (
      <>
        <Text style={styles.titulo}>🧠 ¡Juego Terminado!</Text>
        <Text style={styles.pregunta}>Jugador 1: {puntajeJ1} / 5</Text>
        <Text style={styles.pregunta}>Jugador 2: {puntajeJ2} / 5</Text>
        <Text style={styles.resultado}>
          {puntajeJ1 > puntajeJ2
            ? "🏆 Gana Jugador 1"
            : puntajeJ2 > puntajeJ1
            ? "🏆 Gana Jugador 2"
            : "🤝 ¡Empate!"}
        </Text>
        <TouchableOpacity style={styles.boton} onPress={onRegresar}>
          <Text style={styles.textoOpcion}>Regresar</Text>
        </TouchableOpacity>
      </>
    ) : (
      <>
        <Text style={styles.titulo}>🎮 Turno de Jugador {turno}</Text>
        <Text style={styles.pregunta}>{actual.pregunta}</Text>
        {actual.opciones.map((opcion) => (
          <TouchableOpacity
            key={opcion}
            style={[
              styles.boton,
              seleccion === opcion &&
                (opcion === actual.respuestaCorrecta
                  ? styles.correcta
                  : styles.incorrecta),
            ]}
            onPress={() => manejarSeleccion(opcion)}
            disabled={seleccion !== null}
          >
            <Text style={styles.textoOpcion}>{opcion}</Text>
          </TouchableOpacity>
        ))}
      </>
    )}
  </View>
</ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    width:'100%',
    height:'auto',
    justifyContent: "center",
    alignItems: "center",
  },
  tarjeta: {
    backgroundColor: "transparetn",
    padding: 20,
    borderRadius: 20,
    width: "85%",
    alignItems: "center",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 12,
  },
  pregunta: {
    fontSize: 18,
    color: "white",
    marginBottom: 12,
    textAlign: "center",
  },
  resultado: {
    fontSize: 20,
    color: "yellow",
    marginVertical: 16,
    fontWeight: "bold",
  },
  boton: {
    backgroundColor: "#5c2fd4",
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  textoOpcion: {
    color: "white",
    fontSize: 16,
  },
  correcta: {
    backgroundColor: "#28a745",
  },
  incorrecta: {
    backgroundColor: "#dc3545",
  },
  barraContenedor: {
  height: 12,
  width: "100%",
  backgroundColor: "#333",
  borderRadius: 10,
  overflow: "hidden",
  marginBottom: 16,
},
barraProgreso: {
  height: "100%",
  backgroundColor: "#5c2fd4",
},
volver: {
  alignSelf: 'flex-start',
  marginBottom: 12,
  backgroundColor: '#222',
  paddingHorizontal: 14,
  paddingVertical: 6,
  borderRadius: 20,
},
volverTexto: {
  color: '#5c2fd4',
  fontSize: 14,
  fontWeight: 'bold',
},
});
