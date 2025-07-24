import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';

import preguntasFacil from '@/components/Juegos/QuizJuego/Preguntas/facil';
import preguntasMedio from '@/components/Juegos/QuizJuego/Preguntas/normal';
import preguntasDificil from '@/components/Juegos/QuizJuego/Preguntas/dificil';
import preguntasHard from '@/components/Juegos/QuizJuego/Preguntas/hard';

const { width, height } = Dimensions.get('window');

export default function Quiz({ nivel, onRegresar }) {
  const [preguntas, setPreguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [puntaje, setPuntaje] = useState(0);
  const [terminado, setTerminado] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [iniciado, setIniciado] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    switch (nivel) {
      case 'fácil':
        setPreguntas(preguntasFacil);
        break;
      case 'medio':
        setPreguntas(preguntasMedio);
        break;
      case 'difícil':
        setPreguntas(preguntasDificil);
        break;
      case 'hard':
        setPreguntas(preguntasHard);
        break;
      default:
        setPreguntas([]);
    }
  }, [nivel]);

  useEffect(() => {
    if (iniciado && !terminado) {
      timerRef.current = setInterval(() => {
        setTiempoRestante((prev) => {
          if (prev === 1) {
            clearInterval(timerRef.current);
            manejarTiempoAgotado();
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [indice, iniciado, terminado]);

  const manejarTiempoAgotado = () => {
    setSeleccion(null);
    if (indice + 1 < preguntas.length) {
      setIndice(indice + 1);
    } else {
      setTerminado(true);
    }
    setTiempoRestante(10);
  };

  const manejarSeleccion = (opcion) => {
    clearInterval(timerRef.current);
    setSeleccion(opcion);
    if (opcion === preguntas[indice].respuestaCorrecta) {
      setPuntaje((prev) => prev + 1);
    }

    setTimeout(() => {
      setSeleccion(null);
      if (indice + 1 < preguntas.length) {
        setIndice(indice + 1);
        setTiempoRestante(10);
      } else {
        setTerminado(true);
      }
    }, 1000);
  };

  const reiniciar = () => {
    setIndice(0);
    setPuntaje(0);
    setTerminado(false);
    setTiempoRestante(10);
    setIniciado(false);
  };

  return (
    <ImageBackground
      source={require("../../../assets/Img/universo.jpg")}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.tarjeta}>
        <TouchableOpacity style={styles.botonRegresar} onPress={onRegresar}>
          <Text style={styles.textoRegresar}>⟵ Regresar</Text>
        </TouchableOpacity>

        {!iniciado ? (
          <>
            <Text style={styles.titulo}>Nivel: {nivel}</Text>
            <TouchableOpacity style={styles.boton} onPress={() => setIniciado(true)}>
              <Text style={styles.textoOpcion}>Iniciar</Text>
            </TouchableOpacity>
          </>
        ) : terminado ? (
          <>
            <Text style={styles.titulo}>¡Quiz Terminado!</Text>
            <Text style={styles.pregunta}>
              Puntaje: {puntaje} / {preguntas.length}
            </Text>
            <TouchableOpacity style={styles.boton} onPress={reiniciar}>
              <Text style={styles.textoOpcion}>Reiniciar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.titulo}>QUIZ ESPACIAL</Text>
            <Text style={styles.pregunta}>{preguntas[indice].pregunta}</Text>
            {preguntas[indice].opciones.map((opcion) => (
              <TouchableOpacity
                key={opcion}
                style={[
                  styles.boton,
                  seleccion === opcion &&
                    (opcion === preguntas[indice].respuestaCorrecta
                      ? styles.correcta
                      : styles.incorrecta),
                ]}
                onPress={() => manejarSeleccion(opcion)}
                disabled={seleccion !== null}
              >
                <Text style={styles.textoOpcion}>{opcion}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.barra}>
              <View
                style={[
                  styles.progreso,
                  { width: `${(tiempoRestante / 10) * 100}%` },
                ]}
              />
            </View>
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tarjeta: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 24,
    borderRadius: 24,
    width: width * 0.85,
    minHeight: height * 0.5,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  pregunta: {
    fontSize: 18,
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  boton: {
    backgroundColor: '#5c2fd4',
    padding: 12,
    marginVertical: 6,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
  },
  textoOpcion: {
    color: 'white',
    fontSize: 16,
  },
  correcta: {
    backgroundColor: '#28a745',
  },
  incorrecta: {
    backgroundColor: '#dc3545',
  },
  barra: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    overflow: 'hidden',
  },
  progreso: {
    height: '100%',
    backgroundColor: '#00bfff',
  },
  botonRegresar: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    backgroundColor: '#5c2fd499',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  textoRegresar: {
    color: 'white',
    fontSize: 14,
  },
});
