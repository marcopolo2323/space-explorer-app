//principal.jsx
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Inicio from './inicio';
import Asteroides from './secciones/Asteroides';
import CuriosityFotos from './secciones/CuriosityFotos';
import EpicImages from './secciones/EpicImages';

export default function Curiosidades() {
  const [pantalla, setPantalla] = useState("inicio");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardPress = (item) => {
    setSelectedItem(item);
    setPantalla(item.screenName);
  };

  const regresarAlInicio = () => {
    setPantalla("inicio");
    setSelectedItem(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {pantalla === "inicio" && (
        <Inicio onCardPress={handleCardPress} />
      )}

      {pantalla === "curiosity-fotos" && selectedItem && (
        <CuriosityFotos 
          title={selectedItem.title}
          id={selectedItem.id}
          onRegresar={regresarAlInicio}
        />
      )}

      {pantalla === "asteroides" && selectedItem && (
        <Asteroides 
          title={selectedItem.title}
          onRegresar={regresarAlInicio}
        />
      )}

      {pantalla === "epic-images" && selectedItem && (
        <EpicImages 
          title={selectedItem.title}
          id={selectedItem.id}
          onRegresar={regresarAlInicio}
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