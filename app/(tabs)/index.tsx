import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

// Componentes Quiz
import MenuInicio from "@/components/Juegos/QuizJuego/Menuinicio";
import SeleccionNivel from "@/components/Juegos/QuizJuego/seleccionnivel";
import SeleccionNivelPvp from "@/components/Juegos/QuizJuego/SeleccionNivelPvP";
import Quiz from "@/components/Juegos/QuizJuego/Quiz";
import PvPQuiz from "@/components/Juegos/QuizJuego/Quizversus";

// Componentes Memorama
import MenuPrincipalMemorama from "@/components/Juegos/MemoramaJuego/MenuMemorama";
import SeleccionNivelMemorama from "@/components/Juegos/MemoramaJuego/SeleccionMemorama";
import JuegoMemorama from "@/components/Juegos/MemoramaJuego/JuegoMemorama";

// Menú general
import MenuPrincipal from "@/components/MenuPrincipal";

type Pantalla =
  | "menu-principal"
  | "quiz-menu"
  | "seleccion-nivel-quiz"
  | "seleccion-nivel-pvp"
  | "quiz"
  | "pvp"
  | "memorama-menu"
  | "memorama-nivel"
  | "memorama-juego";

type Nivel = "fácil" | "medio" | "difícil" | "hard";

export default function App() {
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

  // --- REGRESAR ---
  const regresarAlMenu = () => setPantalla("menu-principal");
  const regresarAMenuQuiz = () => setPantalla("quiz-menu");
  const regresarAMenuMemorama = () => setPantalla("memorama-menu");

  return (
    <SafeAreaView style={styles.container}>
      {/* Menú general */}
      {pantalla === "menu-principal" && (
        <MenuPrincipal
          onSeleccionar={(juego: "quiz" | "memorama") => {
            if (juego === "quiz") iniciarQuiz();
            if (juego === "memorama") iniciarMemorama();
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});