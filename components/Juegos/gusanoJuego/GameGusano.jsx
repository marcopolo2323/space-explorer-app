import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions,
  Image, ImageBackground, FlatList, Platform, PanResponder, SafeAreaView
} from 'react-native';

import { Audio } from 'expo-av';

// Referencias globales para audio optimizadas
let musicaGalactica;
let sonidoGameOver;
let sonidoComer;
let audioLoaded = false;

// Funciones de audio optimizadas con caché
const iniciarMusicaFondo = async () => {
  if (musicaGalactica && audioLoaded) {
    try {
      await musicaGalactica.replayAsync();
      return;
    } catch (error) {
      console.log('Error al reiniciar música:', error);
    }
  }

  musicaGalactica = new Audio.Sound();
  try {
    await musicaGalactica.loadAsync(
      require('./assest/music/mario.mp3'),
      { isLooping: true, volume: 0.3 }
    );
    await musicaGalactica.playAsync();
    audioLoaded = true;
  } catch (error) {
    console.log('Error al reproducir música:', error);
  }
};

const reproducirSonidoGameOver = async () => {
  if (!sonidoGameOver) {
    sonidoGameOver = new Audio.Sound();
    try {
      await sonidoGameOver.loadAsync(require('./assest/music/gameover.mp3'));
    } catch (error) {
      console.log('Error al cargar sonido de Game Over:', error);
      return;
    }
  }
  
  try {
    await sonidoGameOver.replayAsync();
  } catch (error) {
    console.log('Error al reproducir sonido de Game Over:', error);
  }
};

const reproducirSonidoComer = async () => {
  if (!sonidoComer) {
    sonidoComer = new Audio.Sound();
    try {
      await sonidoComer.loadAsync(require('./assest/music/malvada.mp3'));
    } catch (error) {
      console.log('Error al cargar sonido de comer planeta:', error);
      return;
    }
  }
  
  try {
    await sonidoComer.replayAsync();
  } catch (error) {
    console.log('Error al reproducir sonido de comer planeta:', error);
  }
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const GRID_SIZE = 8;

// Sprites precargados
const galactusSprite = require('./img/galactus.png');
const fondoEspacial = require('./assest/gusanod.jpg');
const agujeroNegro = require('./img/agujero.png');
const mercurio = require('./assest/mercurio.png');
const sol = require('./assest/sol.png');
const venus = require('./assest/venus.png');
const impactoVisual = require('./img/explosion.png');
const neptuno = require('./assest/neptuno.png');
const tierra = require('./assest/tierra.png');
const saturno = require('./assest/saturno.png');
const martes = require('./assest/martes.png');
const urano = require('./assest/urano.png');
const jupiter = require('./assest/jupiter.png');

const opcionesComida = [agujeroNegro, mercurio, sol, venus, neptuno, saturno, tierra, martes, jupiter, urano];

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
  const [comida, setComida] = useState(() => generarComida([{ x: 4, y: 4 }]));
  const [impacto, setImpacto] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [registros, setRegistros] = useState([]);

  // Referencias para optimización
  const gameLoopRef = useRef(null);
  const direccionRef = useRef('RIGHT');
  const lastDirectionTime = useRef(0);
  const impactoTimeoutRef = useRef(null);

  // Actualizar referencia de dirección sin causar re-renders
  useEffect(() => {
    direccionRef.current = direccion;
  }, [direccion]);

  // Función optimizada para cambio de dirección con debounce
  const cambiarDireccion = useCallback((nuevaDireccion) => {
    const now = Date.now();
    if (now - lastDirectionTime.current < 100) return;
    
    const direccionActual = direccionRef.current;
    
    const movimientosOpuestos = {
      'UP': 'DOWN',
      'DOWN': 'UP',
      'LEFT': 'RIGHT',
      'RIGHT': 'LEFT'
    };
    
    if (movimientosOpuestos[direccionActual] === nuevaDireccion) return;
    
    setDireccion(nuevaDireccion);
    lastDirectionTime.current = now;
  }, []);

  // Controles por teclado optimizados
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const handleKeyDown = (e) => {
      if (gameOver || pantallaInicio) return;
      
      e.preventDefault();
      
      switch (e.key.toLowerCase()) {
        case 'arrowup': 
        case 'w': 
          cambiarDireccion('UP'); 
          break;
        case 'arrowdown': 
        case 's': 
          cambiarDireccion('DOWN'); 
          break;
        case 'arrowleft': 
        case 'a': 
          cambiarDireccion('LEFT'); 
          break;
        case 'arrowright': 
        case 'd': 
          cambiarDireccion('RIGHT'); 
          break;
      }
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [gameOver, pantallaInicio, cambiarDireccion]);

  // PanResponder optimizado
  const panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 15 || Math.abs(gestureState.dy) > 15;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gameOver || pantallaInicio) return;
      
      const { dx, dy } = gestureState;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      
      if (absDx > absDy && absDx > 20) {
        if (dx > 0) {
          cambiarDireccion('RIGHT');
        } else {
          cambiarDireccion('LEFT');
        }
      } else if (absDy > 20) {
        if (dy > 0) {
          cambiarDireccion('DOWN');
        } else {
          cambiarDireccion('UP');
        }
      }
    },
    onPanResponderRelease: () => {},
  }), [gameOver, pantallaInicio, cambiarDireccion]);

  // Lógica de movimiento optimizada
  const moverGalactus = useCallback(() => {
    if (gameOver || pantallaInicio) return;
    
    setGusano(prevGusano => {
      const cabeza = { ...prevGusano[0] };
      const direccionActual = direccionRef.current;
     
      switch (direccionActual) {
        case 'UP': cabeza.y--; break;
        case 'DOWN': cabeza.y++; break;
        case 'LEFT': cabeza.x--; break;
        case 'RIGHT': cabeza.x++; break;
      }

      if (
        cabeza.x < 0 || cabeza.x >= GRID_SIZE ||
        cabeza.y < 0 || cabeza.y >= GRID_SIZE ||
        prevGusano.some(seg => seg.x === cabeza.x && seg.y === cabeza.y)
      ) {
        setGameOver(true);
        reproducirSonidoGameOver();
        
        setRegistros(prevRegistros => {
          const nuevoRegistro = { nick: nickname.trim(), puntos: puntaje };
          const todos = [...prevRegistros, nuevoRegistro]
            .sort((a, b) => b.puntos - a.puntos)
            .slice(0, 5);
          return todos;
        });

        if (musicaGalactica) {
          musicaGalactica.stopAsync().catch(console.log);
        }

        return prevGusano;
      }

      let nuevoGusano = [cabeza, ...prevGusano];
      
      if (cabeza.x === comida.x && cabeza.y === comida.y) {
        reproducirSonidoComer();
        setComida(generarComida(nuevoGusano));
        setImpacto({ x: cabeza.x, y: cabeza.y });
        setPuntaje(prev => prev + 1);
        
        if (impactoTimeoutRef.current) {
          clearTimeout(impactoTimeoutRef.current);
        }
        
        impactoTimeoutRef.current = setTimeout(() => {
          setImpacto(null);
          impactoTimeoutRef.current = null;
        }, 300);
      } else {
        nuevoGusano.pop();
      }

      return nuevoGusano;
    });
  }, [gameOver, pantallaInicio, comida.x, comida.y, nickname, puntaje]);

  // Loop de juego optimizado
  useEffect(() => {
    if (!gameOver && !pantallaInicio) {
      gameLoopRef.current = setInterval(moverGalactus, 250);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    };
  }, [gameOver, pantallaInicio, moverGalactus]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
      if (impactoTimeoutRef.current) {
        clearTimeout(impactoTimeoutRef.current);
      }
    };
  }, []);

  const reiniciarJuego = useCallback(() => {
    if (impactoTimeoutRef.current) {
      clearTimeout(impactoTimeoutRef.current);
      impactoTimeoutRef.current = null;
    }

    setGusano([{ x: 4, y: 4 }]);
    setDireccion('RIGHT');
    direccionRef.current = 'RIGHT';
    setComida(generarComida([{ x: 4, y: 4 }]));
    setGameOver(false);
    setPuntaje(0);
    setImpacto(null);
    lastDirectionTime.current = 0;
    iniciarMusicaFondo();
  }, []);

  const obtenerRotacion = useMemo(() => {
    const rotaciones = {
      'UP': '0deg',
      'RIGHT': '90deg',
      'DOWN': '180deg',
      'LEFT': '270deg'
    };
    return rotaciones[direccion] || '0deg';
  }, [direccion]);

  // Memoizar la renderización del tablero
  const renderTablero = useMemo(() => {
    const filas = [];
    
    for (let y = 0; y < GRID_SIZE; y++) {
      const celdas = [];
      
      for (let x = 0; x < GRID_SIZE; x++) {
        const esCabeza = gusano[0]?.x === x && gusano[0]?.y === y;
        const esCuerpo = gusano.slice(1).some(seg => seg.x === x && seg.y === y);
        const esComida = comida.x === x && comida.y === y;
        const mostrarImpacto = impacto?.x === x && impacto?.y === y;

        celdas.push(
          <View key={`${x}-${y}`} style={styles.celda}>
            {esCabeza && (
              <Image
                source={galactusSprite}
                style={[styles.galactus, { transform: [{ rotate: obtenerRotacion }] }]}
              />
            )}
            {esCuerpo && <View style={styles.energiaGalactus} />}
            {esComida && <Image source={comida.tipo} style={styles.objetoCosmico} />}
            {mostrarImpacto && <Image source={impactoVisual} style={styles.impactoVisual} />}
          </View>
        );
      }
      
      filas.push(
        <View key={y} style={styles.fila}>
          {celdas}
        </View>
      );
    }
    
    return filas;
  }, [gusano, comida, impacto, obtenerRotacion]);

  if (pantallaInicio) {
    return (
      <ImageBackground source={fondoEspacial} style={styles.fondo} resizeMode="cover">
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.inicioContainer}>
            <View style={styles.inicioCentrado}>
              <Text style={styles.tituloInicio}>🌌 Galactus Devora Universos</Text>
              
              <View style={styles.inputContainer}>
                <Text style={styles.labelInput}>Ingresa tu Nickname:</Text>
                <TextInput
                  style={styles.input}
                  value={nickname}
                  onChangeText={setNickname}
                  placeholder="Galactus"
                  placeholderTextColor="#666"
                />
              </View>

              <View style={styles.botonesInicioContainer}>
                <TouchableOpacity
                  onPress={() => {
                    if (nickname.trim() === '') {
                      alert('Debes ingresar un nombre galáctico para comenzar 🚀');
                    } else {
                      setPantallaInicio(false);
                      iniciarMusicaFondo();
                    }
                  }}
                  style={[styles.botonControl, styles.botonIniciar]}
                >
                  <Text style={styles.botonTexto}>🚀 Iniciar Conquista</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onRegresar}
                  style={[styles.botonControl, styles.botonRegresar]}
                >
                  <Text style={[styles.botonTexto, { color: '#5ecdf0' }]}>⏎ Regresar</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.instruccionesContainer}>
                <Text style={styles.instrucciones}>
                  {Platform.OS !== 'web' 
                    ? '💡 Desliza en la pantalla para controlar a Galactus'
                    : '💡 Usa las flechas del teclado o WASD para jugar'
                  }
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={fondoEspacial} style={styles.fondo} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container} {...(Platform.OS !== 'web' ? panResponder.panHandlers : {})}>
          
          {/* Header con información del jugador */}
          <View style={styles.header}>
            <Text style={styles.infoJugador}>👤 {nickname}</Text>
            <Text style={styles.puntaje}>⭐ {puntaje} puntos</Text>
          </View>

          {/* Contenedor principal del juego */}
          <View style={styles.gameContainer}>
            
            {/* Panel izquierdo (solo web) */}
            {Platform.OS === 'web' && (
              <View style={styles.panelIzquierdo}>
                {gameOver && (
                  <View style={styles.gameOverPanel}>
                    <Text style={styles.textoGameOver}>💀 GAME OVER</Text>
                    <Text style={styles.subtituloGameOver}>Mejores registros:</Text>
                    <FlatList
                      data={registros}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item, index }) => (
                        <Text style={styles.registroItem}>
                          {index + 1}. {item.nick}: {item.puntos} pts
                        </Text>
                      )}
                      style={styles.listaRegistros}
                    />
                    <TouchableOpacity onPress={reiniciarJuego} style={styles.botonReiniciar}>
                      <Text style={styles.botonTexto}>🔄 Reiniciar</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {/* Tablero de juego */}
            <View style={styles.tableroContainer}>
              <View style={styles.tablero}>
                {renderTablero}
              </View>
            </View>

            {/* Panel derecho con controles */}
            <View style={styles.panelDerecho}>
              
              {/* Game Over Mobile */}
              {Platform.OS !== 'web' && gameOver && (
                <View style={styles.gameOverMobile}>
                  <Text style={styles.textoGameOver}>💀 GAME OVER</Text>
                  <Text style={styles.subtituloGameOver}>Mejores registros:</Text>
                  <FlatList
                    data={registros}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                      <Text style={styles.registroItem}>
                        {index + 1}. {item.nick}: {item.puntos} pts
                      </Text>
                    )}
                    style={styles.listaRegistrosMobile}
                  />
                  <TouchableOpacity onPress={reiniciarJuego} style={styles.botonReiniciar}>
                    <Text style={styles.botonTexto}>🔄 Reiniciar</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Controles direccionales */}
              <View style={styles.controlesContainer}>
                <TouchableOpacity 
                  onPress={() => cambiarDireccion('UP')} 
                  style={[styles.botonDireccion, styles.botonUp]}
                  disabled={gameOver}
                >
                  <Text style={styles.textoDireccion}>↑</Text>
                </TouchableOpacity>
                
                <View style={styles.botonesHorizontales}>
                  <TouchableOpacity 
                    onPress={() => cambiarDireccion('LEFT')} 
                    style={[styles.botonDireccion, styles.botonSide]}
                    disabled={gameOver}
                  >
                    <Text style={styles.textoDireccion}>←</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => cambiarDireccion('RIGHT')} 
                    style={[styles.botonDireccion, styles.botonSide]}
                    disabled={gameOver}
                  >
                    <Text style={styles.textoDireccion}>→</Text>
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                  onPress={() => cambiarDireccion('DOWN')} 
                  style={[styles.botonDireccion, styles.botonDown]}
                  disabled={gameOver}
                >
                  <Text style={styles.textoDireccion}>↓</Text>
                </TouchableOpacity>
              </View>

              {/* Botón regresar */}
              <TouchableOpacity
                onPress={() => {
                  if (musicaGalactica) {
                    musicaGalactica.stopAsync().catch(console.log);
                  }
                  if (impactoTimeoutRef.current) {
                    clearTimeout(impactoTimeoutRef.current);
                  }
                  onRegresar(); 
                }}
                style={styles.botonRegresarJuego}
              >
                <Text style={styles.botonTexto}>⏎ Regresar al Menú</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const COLOR_COSMICO = '#5ecdf0';
const COLOR_FONDO_PANEL = 'rgba(17, 17, 17, 0.9)';
const TEXT_SHADOW = {
  textShadowColor: COLOR_COSMICO,
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 2
};

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  safeArea: {
    flex: 1
  },
  
  // === PANTALLA INICIO ===
  inicioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  inicioCentrado: {
    alignItems: 'center',
    backgroundColor: COLOR_FONDO_PANEL,
    padding: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLOR_COSMICO,
    minWidth: Platform.OS === 'web' ? 400 : '90%',
    maxWidth: 500
  },
  tituloInicio: {
    fontSize: Platform.OS === 'web' ? 28 : 24,
    fontWeight: 'bold',
    color: COLOR_COSMICO,
    marginBottom: 30,
    textAlign: 'center',
    ...TEXT_SHADOW
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 30
  },
  labelInput: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 10
  },
  input: {
    borderBottomWidth: 2,
    borderColor: COLOR_COSMICO,
    color: '#fff',
    width: 250,
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 5,
    paddingHorizontal: 15
  },
  botonesInicioContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  botonIniciar: {
    marginBottom: 15,
    paddingHorizontal: 30,
    paddingVertical: 15
  },
  botonRegresar: {
    backgroundColor: 'transparent',
    borderColor: COLOR_COSMICO,
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 15
  },
  instruccionesContainer: {
    marginTop: 20
  },
  instrucciones: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic'
  },

  // === JUEGO PRINCIPAL ===
  container: {
    flex: 1,
    paddingHorizontal: Platform.OS === 'web' ? 20 : 10,
    paddingVertical: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLOR_FONDO_PANEL,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLOR_COSMICO,
    marginBottom: 15
  },
  infoJugador: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR_COSMICO,
    ...TEXT_SHADOW
  },
  puntaje: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    ...TEXT_SHADOW
  },
  gameContainer: {
    flex: 1,
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: Platform.OS === 'web' ? 20 : 10
  },

  // === PANEL IZQUIERDO (WEB) ===
  panelIzquierdo: {
    flex: Platform.OS === 'web' ? 0.25 : 0,
    minWidth: Platform.OS === 'web' ? 200 : 0,
    justifyContent: 'center'
  },
  gameOverPanel: {
    backgroundColor: COLOR_FONDO_PANEL,
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'crimson',
    alignItems: 'center'
  },

  // === TABLERO ===
  tableroContainer: {
    flex: Platform.OS === 'web' ? 0.5 : 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Platform.OS === 'web' ? 0 : 10
  },
  tablero: {
    width: Platform.OS === 'web' ? 
      Math.min(SCREEN_WIDTH * 0.4, SCREEN_HEIGHT * 0.6) : 
      Math.min(SCREEN_WIDTH * 0.9, SCREEN_HEIGHT * 0.5),
    height: Platform.OS === 'web' ? 
      Math.min(SCREEN_WIDTH * 0.4, SCREEN_HEIGHT * 0.6) : 
      Math.min(SCREEN_WIDTH * 0.9, SCREEN_HEIGHT * 0.5),
    backgroundColor: COLOR_FONDO_PANEL,
    borderWidth: 3,
    borderColor: COLOR_COSMICO,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: COLOR_COSMICO,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10
  },

  // === PANEL DERECHO ===
  panelDerecho: {
    flex: Platform.OS === 'web' ? 0.25 : 0,
    minWidth: Platform.OS === 'web' ? 200 : '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  // === GAME OVER MOBILE ===
  gameOverMobile: {
    backgroundColor: COLOR_FONDO_PANEL,
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'crimson',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%'
  },
  textoGameOver: {
    color: 'crimson',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  subtituloGameOver: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center'
  },
  listaRegistros: {
    maxHeight: 120,
    width: '100%'
  },
  listaRegistrosMobile: {
    maxHeight: 100,
    width: '100%'
  },
  registroItem: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    paddingVertical: 2
  },

  // === CONTROLES ===
  controlesContainer: {
    alignItems: 'center',
    backgroundColor: COLOR_FONDO_PANEL,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLOR_COSMICO,
    marginBottom: 15
  },
  botonesHorizontales: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 120,
    marginVertical: 10
  },
  botonDireccion: {
    backgroundColor: COLOR_COSMICO,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLOR_COSMICO,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 5
  },
  botonUp: {
    marginBottom: 10
  },
  botonDown: {
    marginTop: 10
  },
  botonSide: {
    // Los estilos base ya están en botonDireccion
  },
  textoDireccion: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold'
  },

  // === ELEMENTOS DEL JUEGO ===
  fila: {
    flexDirection: 'row',
    flex: 1
  },
  celda: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  galactus: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain'
  },
  energiaGalactus: {
    width: '60%',
    height: '60%',
    backgroundColor: '#8A2BE2',
    borderRadius: 50,
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5
  },
  objetoCosmico: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain'
  },
  impactoVisual: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    zIndex: 10
  },

  // === BOTONES GENERALES ===
  botonControl: {
    backgroundColor: COLOR_COSMICO,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLOR_COSMICO,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 5
  },
  botonTexto: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold'
  },
  botonReiniciar: {
    backgroundColor: COLOR_COSMICO,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 15,
    alignItems: 'center',
    shadowColor: COLOR_COSMICO,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 5
  },
  botonRegresarJuego: {
    backgroundColor: 'transparent',
    borderColor: COLOR_COSMICO,
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  }
});