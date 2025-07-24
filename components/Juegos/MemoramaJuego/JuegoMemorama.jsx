import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";

// Importaciones estáticas
import facil from '@/components/Juegos/MemoramaJuego/data/facil';
import medio from '@/components/Juegos/MemoramaJuego/data/medio';
import dificil from '@/components/Juegos/MemoramaJuego/data/dificil';
import hard from '@/components/Juegos/MemoramaJuego/data/hard';

const { width, height } = Dimensions.get("window");

// Configuración de niveles
const configNiveles = {
  fácil: {
    data: facil.slice(0, 6),     // 6 íconos → 12 cartas (3x4)
    columnas: 3,
    filas: 4,
    tamañoCarta: 80,
  },
  medio: {
    data: medio.slice(0, 8),     // 8 íconos → 16 cartas (4x4)
    columnas: 4,
    filas: 4,
    tamañoCarta: 70,
  },
  difícil: {
    data: dificil.slice(0, 12),  // 12 íconos → 24 cartas (6x4)
    columnas: 6,
    filas: 4,
    tamañoCarta: 60,
  },
  hard: {
    data: hard.slice(0, 32),     // 32 íconos → 64 cartas (8x8)
    columnas: 8,
    filas: 8,
    tamañoCarta: 38,
  },
};
export default function JuegoMemorama({ nivel, onRegresar }) {
  const [cartas, setCartas] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [emparejadas, setEmparejadas] = useState([]);
  const [ganado, setGanado] = useState(false);
  const [configActual, setConfigActual] = useState(configNiveles[nivel]);

  useEffect(() => {
    setConfigActual(configNiveles[nivel]);
    cargarCartas();
  }, [nivel]);

  const cargarCartas = () => {
    const data = JSON.parse(JSON.stringify(configActual.data));
    const duplicadas = [...data, ...data];
    const mezcladas = duplicadas
      .map((carta) => ({ ...carta, id: Math.random().toString() }))
      .sort(() => Math.random() - 0.5);

    setCartas(mezcladas);
    setEmparejadas([]);
    setSeleccionadas([]);
    setGanado(false);
  };

  const manejarSeleccion = (carta) => {
    if (
      seleccionadas.length === 2 ||
      seleccionadas.find((c) => c.id === carta.id) ||
      emparejadas.includes(carta.valor)
    )
      return;

    const nuevasSeleccionadas = [...seleccionadas, carta];
    setSeleccionadas(nuevasSeleccionadas);

    if (nuevasSeleccionadas.length === 2) {
      const [a, b] = nuevasSeleccionadas;
      if (a.valor === b.valor) {
        setEmparejadas((prev) => [...prev, a.valor]);
        if (emparejadas.length + 1 === cartas.length / 2) {
          setTimeout(() => setGanado(true), 500);
        }
      }
      setTimeout(() => setSeleccionadas([]), 1000);
    }
  };

  const esVolteada = (carta) =>
    seleccionadas.some((c) => c.id === carta.id) || emparejadas.includes(carta.valor);

  // Estilos dinámicos basados en el nivel
  const getGridStyles = () => {
  return {
    width: configActual.columnas * (configActual.tamañoCarta + 10),
    height: configActual.filas * (configActual.tamañoCarta + 10),
    maxWidth: width * 0.95,
  };
};


  const getCartaStyles = () => {
    return {
      width: configActual.tamañoCarta,
      height: configActual.tamañoCarta,
      margin: 5,
    };
  };

  return (
    <ImageBackground
      source={require("@/components/Juegos/gusanoJuego/img/milky.jpg")}
      style={styles.fondo}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contenedor}>
          <TouchableOpacity style={styles.botonRegresar} onPress={onRegresar}>
            <Text style={styles.textoRegresar}>← Volver</Text>
          </TouchableOpacity>

          <Text style={styles.titulo}>Nivel: {nivel.toUpperCase()} ({configActual.columnas}x{configActual.columnas})</Text>

          <View style={[styles.grid, getGridStyles()]}>
            {cartas.map((carta) => (
              <TouchableOpacity
                key={carta.id}
                style={[
                  styles.carta,
                  getCartaStyles(),
                  esVolteada(carta) ? styles.volteada : styles.oculta,
                ]}
                onPress={() => manejarSeleccion(carta)}
              >
                <Text style={[
                  styles.textoCarta,
                  { fontSize: configActual.tamañoCarta * 0.5 }
                ]}>
                  {esVolteada(carta) ? carta.valor : "?"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {ganado && (
            <View style={styles.resultado}>
              <Text style={styles.titulo}>¡Ganaste! 🎉</Text>
              <TouchableOpacity style={styles.boton} onPress={cargarCartas}>
                <Text style={styles.textoBoton}>Jugar de nuevo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botonRegresar} onPress={onRegresar}>
                <Text style={styles.textoRegresar}>Volver</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  contenedor: {
    backgroundColor: 'transparent',
    padding: 20,
    borderRadius: 20,
    width: '90%',
    maxWidth: 500,
    alignItems: 'center',
    marginVertical: 10,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  carta: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0f0f',
    shadowColor: '#5c2fd4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3,
  },
  oculta: {
    backgroundColor: '#5c2fd4',
  },
  volteada: {
    backgroundColor: '#28a745',
  },
  textoCarta: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultado: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  boton: {
    backgroundColor: '#5c2fd4',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  textoBoton: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  botonRegresar: {
    alignSelf: 'flex-start',
    backgroundColor: '#222',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  textoRegresar: {
    color: '#5c2fd4',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
