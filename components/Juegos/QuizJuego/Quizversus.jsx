import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import preguntasFacil from '@/components/Juegos/QuizJuego/Preguntas/facil';
import preguntasMedio from '@/components/Juegos/QuizJuego/Preguntas/normal';
import preguntasDificil from '@/components/Juegos/QuizJuego/Preguntas/dificil';
import preguntasHard from '@/components/Juegos/QuizJuego/Preguntas/hard';

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
    setTerminado(false);
    const barajadas = [...preguntas].sort(() => 0.5 - Math.random()).slice(0, 10);
    setPreguntas(barajadas);
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
        {/* Botón de regresar - igual que en el selector */}
        <TouchableOpacity style={styles.botonRegresar} onPress={onRegresar}>
          <Text style={styles.textoRegresar}>← Volver</Text>
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
            <View style={styles.botonesFinales}>
              <TouchableOpacity style={styles.boton} onPress={reiniciar}>
                <Text style={styles.textoOpcion}>Jugar de nuevo</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.boton, styles.botonSecundario]} 
                onPress={onRegresar}
              >
                <Text style={styles.textoOpcion}>Cambiar nivel</Text>
              </TouchableOpacity>
            </View>
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
  botonSecundario: {
    backgroundColor: "#444",
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
  botonesFinales: {
    width: "100%",
    marginTop: 10,
  },
});