import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router'; // ← Cambia esto
import CuriosidadesCard from './curiosidades_card';
import { curiosidadesData } from './curiosidades_data';

const Inicio = () => { // ← Elimina { navigation }
  const router = useRouter(); // ← Usa useRouter en lugar de navigation

  const handleCardPress = (item) => {
    // Mapea los nombres de pantalla a rutas de Expo Router
    const routeMap = {
      'CuriosityFotos': '/curiosidades/curiosityfotos',
      'Asteroides': '/curiosidades/asteroides', 
      'EpicImages': '/curiosidades/epicimages'
    };
    
    const route = routeMap[item.screenName];
    if (route) {
      router.push(route); // ← Usa router.push en lugar de navigation.navigate
    }
  };

  const renderCard = ({ item }) => (
    <CuriosidadesCard item={item} onPress={handleCardPress} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#0F172A', '#1E293B', '#334155']}
        style={styles.background}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>CURIOSIDADES DEL</Text>
          <Text style={styles.headerSubtitle}>UNIVERSO</Text>
          <View style={styles.stars}>
            <Text style={styles.star}>✨</Text>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.star}>✨</Text>
          </View>
        </View>

        <FlatList
          data={curiosidadesData}
          renderItem={renderCard}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

// Los estilos permanecen igual
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 2,
  },
  headerSubtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 10,
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 100,
  },
  star: {
    fontSize: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default Inicio;