import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Animated,
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
  const [vidas, setVidas] = useState(3);
  const [mensajeInicioVisible, setMensajeInicioVisible] = useState(true);
  const timerRef = useRef(null);

  const corazonesAnimados = [
    useRef(new Animated.Value(1)).current,
    useRef(new Animated.Value(1)).current,
    useRef(new Animated.Value(1)).current,
  ];

  const progresoTiempo = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    switch (nivel) {
      case 'fácil': setPreguntas(preguntasFacil); break;
      case 'medio': setPreguntas(preguntasMedio); break;
      case 'difícil': setPreguntas(preguntasDificil); break;
      case 'hard': setPreguntas(preguntasHard); break;
      default: setPreguntas([]);
    }
  }, [nivel]);

  useEffect(() => {
    if (!iniciado) {
      setMensajeInicioVisible(true);
      const inicioTimeout = setTimeout(() => {
        setIniciado(true);
        setMensajeInicioVisible(false);
      }, 2000);
      return () => clearTimeout(inicioTimeout);
    }
  }, [iniciado]);

  useEffect(() => {
    if (iniciado && !terminado) {
      if (nivel === 'difícil' || nivel === 'hard') {
        progresoTiempo.setValue(1);
        Animated.timing(progresoTiempo, {
          toValue: 0,
          duration: 10000,
          useNativeDriver: false,
        }).start();

        timerRef.current = setTimeout(() => {
          manejarTiempoAgotado();
        }, 10000);
      } else {
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
    }

    return () => clearInterval(timerRef.current);
  }, [indice, iniciado, terminado]);

  const manejarTiempoAgotado = () => {
    if (nivel !== 'fácil') {
      setVidas((prev) => {
        const restantes = prev - 1;
        if (restantes >= 0 && restantes < 3) {
          Animated.timing(corazonesAnimados[restantes], {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }).start();
        }
        if (restantes <= 0) setTerminado(true);
        return restantes;
      });
    }

    setSeleccion(null);
    if (indice + 1 < preguntas.length) {
      setIndice(indice + 1);
      setTiempoRestante(10);
    } else {
      setTerminado(true);
    }
  };

  const manejarSeleccion = (opcion) => {
    clearInterval(timerRef.current);
    setSeleccion(opcion);

    const correcta = preguntas[indice].respuestaCorrecta;
    const acierto = opcion === correcta;

    if (acierto) {
      setPuntaje((prev) => prev + 1);
    } else if (nivel !== 'fácil') {
      setVidas((prev) => {
        const restantes = prev - 1;
        if (restantes >= 0 && restantes < 3) {
          Animated.timing(corazonesAnimados[restantes], {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }).start();
        }
        if (restantes <= 0) setTerminado(true);
        return restantes;
      });
    }

    setTimeout(() => {
      setSeleccion(null);
      if (indice + 1 < preguntas.length && !terminado) {
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
    setVidas(3);
    corazonesAnimados.forEach(anim => anim.setValue(1));
  };

  return (
    <ImageBackground
      source={require("@/components/Juegos/gusanoJuego/img/galaxy.jpg")}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.tarjeta}>
        <TouchableOpacity style={styles.volver} onPress={onRegresar}>
          <Text style={styles.volverTexto}>← Volver al selector</Text>
        </TouchableOpacity>

        {(nivel !== 'fácil') && iniciado && !terminado && (
          <View style={{ flexDirection: 'row', marginBottom: 12 }}>
            {corazonesAnimados.map((anim, i) => (
              <Animated.Text
                key={i}
                style={{
                  fontSize: 24,
                  marginHorizontal: 4,
                  transform: [{ scale: anim }],
                  opacity: anim,
                  color: i < vidas ? 'red' : '#444',
                }}
              >
                ❤️
              </Animated.Text>
            ))}
          </View>
        )}

        {!iniciado && mensajeInicioVisible ? (
          <Text style={{ fontSize: 18, color: '#fff', marginBottom: 20 }}>
            🚀 Comienza la partida...
          </Text>
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

            {(nivel === "difícil" || nivel === "hard") && (
              <View style={styles.barraVersus}>
                <Animated.View
                  style={[
                    styles.progresoVersus,
                    {
                      width: progresoTiempo.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["100%", "0%"],
                      }),
                    },
                  ]}
                />
              </View>
            )}
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
    backgroundColor: 'transparent',
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
  barraVersus: {
    height: 6,
    width: '100%',
    backgroundColor: '#222',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#5c2fd4',
    marginTop: 20,
    overflow: 'hidden',
  },
  progresoVersus: {
    height: '100%',
    backgroundColor: '#5c2fd4',
    borderRadius: 20,
  },
});
