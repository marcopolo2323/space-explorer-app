import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions,
  Image, ImageBackground, FlatList
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const GRID_SIZE = 8;

const galactusSprite = require('./img/galactus.png');
const fondoEspacial = require('./img/fondoespacio.jpeg');
const agujeroNegro = require('./img/agujero.png');
const mercurio = require('./assest/mercurio.png');
const sol = require('./assest/sol.png');
const venus = require('./assest/venus.png');
const impactoVisual = require('./img/explosion.png');

const opcionesComida = [agujeroNegro, mercurio, sol, venus];

const generarComida = (gusano) => {
  let nueva;
  do {
    nueva = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
  } while (gusano.some(segmento => segmento.x === nueva.x && segmento.y === nueva.y));
  const imagen = opcionesComida[Math.floor(Math.random() * opcionesComida.length)];
  return { ...nueva, tipo: imagen };
};

export default function GusanoGalactusGame({ onRegresar }) {
  const [pantallaInicio, setPantallaInicio] = useState(true);
  const [nickname, setNickname] = useState('');
  const [gusano, setGusano] = useState([{ x: 4, y: 4 }]);
  const [direccion, setDireccion] = useState('RIGHT');
  const [comida, setComida] = useState(generarComida([{ x: 4, y: 4 }]));
  const [impacto, setImpacto] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key.toLowerCase()) {
        case 'arrowup': case 'w': setDireccion('UP'); break;
        case 'arrowdown': case 's': setDireccion('DOWN'); break;
        case 'arrowleft': case 'a': setDireccion('LEFT'); break;
        case 'arrowright': case 'd': setDireccion('RIGHT'); break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (!gameOver && !pantallaInicio) moverGalactus();
    }, 300);
    return () => clearInterval(intervalo);
  }, [gusano, direccion, gameOver, pantallaInicio]);

  const moverGalactus = () => {
    const cabeza = { ...gusano[0] };
    switch (direccion) {
      case 'UP': cabeza.y--; break;
      case 'DOWN': cabeza.y++; break;
      case 'LEFT': cabeza.x--; break;
      case 'RIGHT': cabeza.x++; break;
    }

    if (
      cabeza.x < 0 || cabeza.x >= GRID_SIZE ||
      cabeza.y < 0 || cabeza.y >= GRID_SIZE ||
      gusano.some(seg => seg.x === cabeza.x && seg.y === cabeza.y)
    ) {
      setGameOver(true);
      const nuevoRegistro = { nick: nickname.trim(), puntos: puntaje };
      const todos = [...registros, nuevoRegistro]
        .sort((a, b) => b.puntos - a.puntos)
        .slice(0, 5);
      setRegistros(todos);
      return;
    }

    let nuevoGusano = [cabeza, ...gusano];
    if (cabeza.x === comida.x && cabeza.y === comida.y) {
      setComida(generarComida(nuevoGusano));
      setImpacto({ x: cabeza.x, y: cabeza.y });
      setPuntaje(prev => prev + 1);
      setTimeout(() => setImpacto(null), 300);
    } else {
      nuevoGusano.pop();
    }

    setGusano(nuevoGusano);
  };

  const reiniciarJuego = () => {
    setGusano([{ x: 4, y: 4 }]);
    setDireccion('RIGHT');
    setComida(generarComida([{ x: 4, y: 4 }]));
    setGameOver(false);
    setPuntaje(0);
    setImpacto(null);
  };

  const obtenerRotacion = () => {
    switch (direccion) {
      case 'UP': return '0deg';
      case 'RIGHT': return '90deg';
      case 'DOWN': return '180deg';
      case 'LEFT': return '270deg';
      default: return '0deg';
    }
  };

  if (pantallaInicio) {
    return (
      <ImageBackground source={fondoEspacial} style={styles.fondo} resizeMode="cover">
        <View style={styles.inicio}>
          <Text style={styles.titulo}>🌌 Galactus Devora Universos</Text>
          <Text style={{ color: '#ccc' }}>Ingresa tu Nickname:</Text>
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
            placeholder="Galactus"
            placeholderTextColor="#666"
          />
          <TouchableOpacity
            onPress={() => {
              if (nickname.trim() === '') {
                alert('Debes ingresar un nombre galáctico para comenzar 🚀');
              } else {
                setPantallaInicio(false);
              }
            }}
            style={styles.botonControl}
          >
            <Text style={styles.botonTexto}>🚀 Iniciar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={fondoEspacial} style={styles.fondo} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.titulo}>Jugador: {nickname} | Puntos: {puntaje}</Text>

        <View style={styles.gameContainer}>
          <View style={styles.panelIzquierdo}>
            {gameOver && (
              <View style={styles.gameOver}>
                <Text style={styles.textoGameOver}>💀 GAME OVER</Text>
                <Text style={{ color: '#ccc', marginBottom: 5 }}>Tus mejores registros:</Text>
                <FlatList
                  data={registros}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <Text style={{ color: '#fff' }}>
                      {index + 1}. {item.nick}: {item.puntos} puntos
                    </Text>
                  )}
                />
                <TouchableOpacity onPress={reiniciarJuego} style={styles.botonControl}>
                  <Text style={styles.botonTexto}>🔄 Reiniciar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.tablero}>
            {Array.from({ length: GRID_SIZE }).map((_, y) => (
              <View key={y} style={styles.fila}>
                {Array.from({ length: GRID_SIZE }).map((_, x) => {
                  const esCabeza = gusano[0].x === x && gusano[0].y === y;
                  const esCuerpo = gusano.slice(1).some(seg => seg.x === x && seg.y === y);
                  const esComida = comida.x === x && comida.y === y;
                  const mostrarImpacto = impacto?.x === x && impacto?.y === y;

                  return (
                    <View key={x} style={styles.celda}>
                      {esCabeza && (
                        <Image
                          source={galactusSprite}
                          style={[styles.galactus, { transform: [{ rotate: obtenerRotacion() }] }]}
                        />
                      )}
                      {esCuerpo && <View style={styles.energiaGalactus} />}
                      {esComida && <Image source={comida.tipo} style={styles.objetoCosmico} />}
                      {mostrarImpacto && <Image source={impactoVisual} style={styles.impactoVisual} />}
                    </View>
                  );
                })}
              </View>
            ))}
          </View>

          <View style={styles.flechas}>
  <TouchableOpacity onPress={() => setDireccion('UP')} style={styles.botonControl}>
    <Text style={styles.botonTexto}>↑</Text>
  </TouchableOpacity>
  <View style={styles.flechasFila}>
    <TouchableOpacity onPress={() => setDireccion('LEFT')} style={styles.botonControl}>
      <Text style={styles.botonTexto}>←</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setDireccion('RIGHT')} style={styles.botonControl}>
      <Text style={styles.botonTexto}>→</Text>
    </TouchableOpacity>
  </View>
  <TouchableOpacity onPress={() => setDireccion('DOWN')} style={styles.botonControl}>
    <Text style={styles.botonTexto}>↓</Text>
  </TouchableOpacity>
        <TouchableOpacity onPress={onRegresar} style={[styles.botonControl, { marginTop: 20 }]}>
          <Text style={styles.botonTexto}>⏎ Regresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</ImageBackground>
); }

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  inicio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#5ecdf0',
    color: '#fff',
    marginVertical: 10,
    width: 200,
    textAlign: 'center',
    fontSize: 18
  },
  container: {
    flex: 1,
    paddingBottom: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5ecdf0',
    marginBottom: 10
  },
  gameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  panelIzquierdo: {
    width: SCREEN_WIDTH * 0.25,
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 12,
    marginRight: 15
  },
  tablero: {
    width: SCREEN_WIDTH * 0.35,
    height: SCREEN_WIDTH * 0.35,
    backgroundColor: 'rgba(17, 17, 17, 0.85)',
    borderWidth: 2,
    borderColor: '#5ecdf0',
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 10
  },
  fila: {
    flexDirection: 'row',
    flex: 1
  },
  celda: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#222'
  },
  galactus: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain'
  },
  energiaGalactus: {
    width: '60%',
    height: '60%',
    backgroundColor: '#5ecdf0',
    borderRadius: 9999,
    opacity: 0.5
  },
  objetoCosmico: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain'
  },
  impactoVisual: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  controles: {
  width: SCREEN_WIDTH * 0.25,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 10
},

  horizontal: {
    flexDirection: 'row',
    marginVertical: 10
  },
 botonControl: {
  backgroundColor: '#5ecdf0',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 14,
  marginVertical: 6,  // antes era margin: 5
  shadowColor: '#5ecdf0',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.6,
  shadowRadius: 3,
  elevation: 5
},

  botonTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },
  gameOver: {
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10
  },
  textoGameOver: {
    color: 'crimson',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  flechas: {
  alignItems: 'center'
},
flechasFila: {
  flexDirection: 'row',
  marginVertical: 5
}
});