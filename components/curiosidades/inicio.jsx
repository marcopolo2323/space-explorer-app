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
import { useRouter } from 'expo-router';
import CuriosidadesCard from './curiosidades_card';
import { curiosidadesData } from './curiosidades_data';

const Inicio = () => {
  const router = useRouter();

  const handleCardPress = (item) => {
    console.log('Intentando navegar a:', item.screenName);
    console.log('Con título:', item.title);
    
    // Como screenName ya tiene la ruta completa, no necesitamos mapeo
    const route = item.screenName;
    
    console.log('✅ Navegando a ruta:', route);
    
    try {
      // Método 1: Usar push con objeto (recomendado)
      router.push({
        pathname: route,
        params: { 
          title: item.title,
          id: item.id.toString()
        }
      });
    } catch (error) {
      console.error('❌ Error con método 1:', error);
      
      try {
        // Método 2: Usar string con query parameters
        const encodedTitle = encodeURIComponent(item.title);
        const fullRoute = `${route}?title=${encodedTitle}&id=${item.id}`;
        console.log('🔄 Intentando ruta alternativa:', fullRoute);
        router.push(fullRoute);
      } catch (error2) {
        console.error('❌ Error con método 2:', error2);
        
        // Método 3: Navegación básica sin parámetros
        console.log('🔄 Usando navegación básica a:', route);
        router.push(route);
      }
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