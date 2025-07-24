import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import preguntasDificil from "../QuizJuego/Preguntas/dificil";
import preguntasFacil from "../QuizJuego/Preguntas/facil";
import preguntasHard from "../QuizJuego/Preguntas/hard";
import preguntasMedio from "../QuizJuego/Preguntas/normal";

export default function PvPQuiz({ nivel, onRegresar }) {
  const [preguntas, setPreguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [puntajeJ1, setPuntajeJ1] = useState(0);
  const [puntajeJ2, setPuntajeJ2] = useState(0);
  const [turno, setTurno] = useState(1); 
  const [terminado, setTerminado] = useState(false);

  useEffect(() => {
    let seleccionadas;
    switch (nivel) {
      case "fácil":
        seleccionadas = preguntasFacil;
        break;
      case "medio":
        seleccionadas = preguntasMedio;
        break;
      case "difícil":
        seleccionadas = preguntasDificil;
        break;
      case "hard":
        seleccionadas = preguntasHard;
        break;
      default:
        seleccionadas = preguntasFacil;
    }

    // Tomamos 10 preguntas aleatorias del nivel
    const barajadas = [...seleccionadas].sort(() => 0.5 - Math.random()).slice(0, 10);
    setPreguntas(barajadas);
  }, [nivel]);

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

  const reiniciar = () => {
    setIndice(0);
    setPuntajeJ1(0);
    setPuntajeJ2(0);
    setTurno(1);
    setTerminando(false);
  };

  if (preguntas.length === 0) return null;

  const actual = preguntas[indice];

  return (
    <ImageBackground
      source={require("../../../assets/Img/universo.jpg")}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.tarjeta}>
        {/* Botón de regreso siempre visible */}
        <TouchableOpacity style={styles.botonRegreso} onPress={onRegresar}>
          <Text style={styles.textoRegreso}>← Regresar</Text>
        </TouchableOpacity>
        
        {terminado ? (
          <>
            <Text style={styles.titulo}>¡Juego Terminado!</Text>
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
            <Text style={styles.titulo}>
              Turno de Jugador {turno}
            </Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  tarjeta: {
    backgroundColor: "rgba(0,0,0,0.7)",
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
  botonRegreso: {
    position: 'absolute',
    top: -40,
    left: 20,
    backgroundColor: "#5c2fd499",
    padding: 8,
    borderRadius: 8,
  },
  textoRegreso: {
    color: "white",
    fontSize: 16,
  },
});
