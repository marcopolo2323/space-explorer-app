import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

// Componentes Quiz
import MenuInicio from "@/components/Juegos/QuizJuego/Menuinicio";
import Quiz from "@/components/Juegos/QuizJuego/Quiz";
import PvPQuiz from "@/components/Juegos/QuizJuego/Quizversus";
import SeleccionNivel from "@/components/Juegos/QuizJuego/seleccionnivel";
import SeleccionNivelPvp from "@/components/Juegos/QuizJuego/SeleccionNivelPvP";

// Componentes Memorama
import JuegoMemorama from "@/components/Juegos/MemoramaJuego/JuegoMemorama";
import MenuPrincipalMemorama from "@/components/Juegos/MemoramaJuego/MenuMemorama";
import SeleccionNivelMemorama from "@/components/Juegos/MemoramaJuego/SeleccionMemorama";

// Componentes Gusano Galáctico
import GusanoGalactusGame from "@/components/Juegos/gusanoJuego/GameGusano";
import MenuGusano from "@/components/Juegos/gusanoJuego/menugusano";

// Menú general
import MenuPrincipal from "@/components/Juegos/MenuPrincipal";

type Pantalla =
  | "menu-principal"
  | "quiz-menu"
  | "seleccion-nivel-quiz"
  | "seleccion-nivel-pvp"
  | "quiz"
  | "pvp"
  | "memorama-menu"
  | "memorama-nivel"
  | "memorama-juego"
  | "gusano-menu"
  | "gusano-juego";

type Nivel = "fácil" | "medio" | "difícil" | "hard";

function MinijuegosScreen() {
  const [pantalla, setPantalla] = useState<Pantalla>("menu-principal");
  const [nivelSeleccionado, setNivelSeleccionado] = useState<Nivel | null>(null);

  // --- QUIZ ---
  const iniciarQuiz = () => setPantalla("quiz-menu");
  const iniciarSolitario = () => setPantalla("seleccion-nivel-quiz");
  const iniciarPvp = () => setPantalla("seleccion-nivel-pvp");

  const manejarNivelSolitario = (nivel: Nivel) => {
    setNivelSeleccionado(nivel);
    setPantalla("quiz");
  };

  const manejarNivelPvp = (nivel: Nivel) => {
    setNivelSeleccionado(nivel);
    setPantalla("pvp");
  };

  // --- MEMORAMA ---
  const iniciarMemorama = () => setPantalla("memorama-menu");
  const manejarNivelMemorama = (nivel: Nivel) => {
    setNivelSeleccionado(nivel);
    setPantalla("memorama-juego");
  };

  // --- GUSANO GALÁCTICO ---
  const iniciarGusano = () => setPantalla("gusano-menu");

  // --- REGRESAR ---
  const regresarAlMenu = () => setPantalla("menu-principal");
  const regresarAMenuQuiz = () => setPantalla("quiz-menu");
  const regresarAMenuMemorama = () => setPantalla("memorama-menu");

  return (
    <SafeAreaView style={styles.container}>
      {/* Menú general */}
      {pantalla === "menu-principal" && (
        <MenuPrincipal
          onSeleccionar={(juego: "quiz" | "memorama" | "gusano") => {
            if (juego === "quiz") iniciarQuiz();
            if (juego === "memorama") iniciarMemorama();
            if (juego === "gusano") iniciarGusano();
          }}
        />
      )}

      {/* --- QUIZ --- */}
      {pantalla === "quiz-menu" && (
        <MenuInicio
          onIniciar={iniciarSolitario}
          onIniciarPvp={iniciarPvp}
          onRegresar={regresarAlMenu}
        />
      )}

      {pantalla === "seleccion-nivel-quiz" && (
        <SeleccionNivel
          onElegirNivel={manejarNivelSolitario}
          onRegresar={regresarAMenuQuiz}
        />
      )}

      {pantalla === "seleccion-nivel-pvp" && (
        <SeleccionNivelPvp
          onSeleccionarNivel={manejarNivelPvp}
          onRegresar={regresarAMenuQuiz}
        />
      )}

      {pantalla === "quiz" && nivelSeleccionado && (
        <Quiz
          nivel={nivelSeleccionado}
          onRegresar={() => setPantalla("seleccion-nivel-quiz")}
        />
      )}

      {pantalla === "pvp" && nivelSeleccionado && (
        <PvPQuiz
          nivel={nivelSeleccionado}
          onRegresar={() => setPantalla("seleccion-nivel-pvp")}
        />
      )}

      {/* --- MEMORAMA --- */}
      {pantalla === "memorama-menu" && (
        <MenuPrincipalMemorama
          onIniciar={() => setPantalla("memorama-nivel")}
          onRegresar={regresarAlMenu}
        />
      )}

      {pantalla === "memorama-nivel" && (
        <SeleccionNivelMemorama
          onElegirNivel={manejarNivelMemorama}
          onRegresar={regresarAMenuMemorama}
        />
      )}

      {pantalla === "memorama-juego" && nivelSeleccionado && (
        <JuegoMemorama
          nivel={nivelSeleccionado}
          onRegresar={() => setPantalla("memorama-nivel")}
        />
      )}

      {/* --- GUSANO GALÁCTICO --- */}
      {pantalla === "gusano-menu" && (
        <MenuGusano
          onIniciar={() => setPantalla("gusano-juego")}
          onRegresar={regresarAlMenu}
        />
      )}

      {pantalla === "gusano-juego" && (
        <GusanoGalactusGame
          onRegresar={() => setPantalla("gusano-menu")}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MinijuegosScreen;