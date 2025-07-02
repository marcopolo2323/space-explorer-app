import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import MenuInicio from "@/components/QuizJuego/Menuinicio";
import SeleccionNivel from "@/components/QuizJuego/seleccionnivel";
import SeleccionNivelPvp from "@/components/QuizJuego/SeleccionNivelPvP";
import Quiz from "@/components/QuizJuego/Quiz";
import PvPQuiz from "@/components/QuizJuego/Quizversus";

type Pantalla = "menu" | "seleccion-nivel" | "quiz" | "seleccion-nivel-pvp" | "pvp";
type Nivel = "fácil" | "medio" | "difícil" | "hard";

export default function App() {
  const [pantalla, setPantalla] = useState<Pantalla>("menu");
  const [nivelSeleccionado, setNivelSeleccionado] = useState<Nivel | null>(null);

  // --------- MANEJADORES -----------

  const iniciarSolitario = () => {
    setPantalla("seleccion-nivel");
  };

  const iniciarPvp = () => {
    setPantalla("seleccion-nivel-pvp");
  };

  const manejarNivelSolitario = (nivel: Nivel) => {
    setNivelSeleccionado(nivel);
    setPantalla("quiz");
  };

  const manejarNivelPvp = (nivel: Nivel) => {
    setNivelSeleccionado(nivel);
    setPantalla("pvp");
  };

  const regresarAlMenu = () => {
    setPantalla("menu");
    setNivelSeleccionado(null);
  };

  // --------- RENDER -----------

  return (
    <SafeAreaView style={styles.container}>
      {pantalla === "menu" && (
        <MenuInicio onIniciar={iniciarSolitario} onIniciarPvp={iniciarPvp} />
      )}

      {pantalla === "seleccion-nivel" && (
        <SeleccionNivel
          onElegirNivel={manejarNivelSolitario}
          onRegresar={regresarAlMenu}
        />
      )}

      {pantalla === "seleccion-nivel-pvp" && (
        <SeleccionNivelPvp
          onSeleccionarNivel={manejarNivelPvp}
          onRegresar={regresarAlMenu}
        />
      )}

      {pantalla === "quiz" && nivelSeleccionado && (
        <Quiz
          nivel={nivelSeleccionado}
          onRegresar={regresarAlMenu}
        />
      )}

      {pantalla === "pvp" && nivelSeleccionado && (
        <PvPQuiz
          nivel={nivelSeleccionado}
          onRegresar={regresarAlMenu}
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
