import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const SPACE_GRADIENT = ['#0f2027', '#2c5364', '#1a2980', '#000428'];
const STAR_COLOR = 'rgba(255,255,255,0.15)';

const Asteroides = ({ title, onRegresar }) => {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Clave API de NASA (demo key - reemplaza con tu propia clave)
  const NASA_API_KEY = 'gRVZ1ecthz3ERGd2looBcgbrZp4h7lp20q2Zifpr';
   
  const fetchAsteroids = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${endDate}&api_key=${NASA_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Error al obtener datos de la API');
      }
      
      const data = await response.json();
      const asteroidsArray = [];
      
      // Procesar los datos para crear un array plano
      Object.keys(data.near_earth_objects).forEach(date => {
        data.near_earth_objects[date].forEach(asteroid => {
          asteroidsArray.push({
            id: asteroid.id,
            name: asteroid.name,
            date: date,
            diameter: asteroid.estimated_diameter.meters.estimated_diameter_max,
            distance: asteroid.close_approach_data[0].miss_distance.kilometers,
            velocity: asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour,
            isPotentiallyHazardous: asteroid.is_potentially_hazardous_asteroid
          });
        });
      });
      
      // Ordenar por distancia
      asteroidsArray.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      
      setAsteroids(asteroidsArray);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'No se pudieron cargar los asteroides. Verifica tu conexión a internet.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAsteroids();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchAsteroids();
  };

  const formatNumber = (num) => {
    return parseFloat(num).toLocaleString('es-ES', {
      maximumFractionDigits: 0
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderAsteroid = ({ item }) => (
    <TouchableOpacity style={styles.asteroidCard}>
      <View style={styles.asteroidHeader}>
        <Text style={styles.asteroidName}>{item.name}</Text>
        {item.isPotentiallyHazardous && (
          <Text style={styles.hazardBadge}>⚠️ Peligroso</Text>
        )}
      </View>
      
      <View style={styles.asteroidDetails}>
        <Text style={styles.detailText}>
          📅 Fecha: {formatDate(item.date)}
        </Text>
        <Text style={styles.detailText}>
          📏 Diámetro: ~{formatNumber(item.diameter)} m
        </Text>
        <Text style={styles.detailText}>
          🚀 Distancia: {formatNumber(item.distance)} km
        </Text>
        <Text style={styles.detailText}>
          ⚡ Velocidad: {formatNumber(item.velocity)} km/h
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={SPACE_GRADIENT}
          style={styles.background}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={onRegresar} style={styles.backButton}>
              <Text style={styles.backText}>← Volver</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{title || 'Asteroides'}</Text>
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0ff" />
            <Text style={styles.loadingText}>Cargando asteroides...</Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={SPACE_GRADIENT}
        style={styles.background}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onRegresar} style={styles.backButton}>
            <Text style={styles.backText}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{title || 'Asteroides'}</Text>
          <Text style={styles.subtitle}>
            Asteroides cercanos a la Tierra (próximos 7 días)
          </Text>
          <Text style={styles.count}>
            Total: {asteroids.length} asteroides
          </Text>
        </View>
        <FlatList
          data={asteroids}
          renderItem={renderAsteroid}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#0ff"
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No se encontraron asteroides</Text>
              <Text style={styles.emoji}>☄️</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    padding: 24,
    paddingTop: 48,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: STAR_COLOR,
    backgroundColor: 'rgba(10,10,30,0.4)',
    shadowColor: '#0ff',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.25)',
    position: 'absolute',
    left: 24,
    top: 48,
    zIndex: 2,
  },
  backText: {
    color: '#0ff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 6,
    textShadowColor: '#0ff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#b3e0ff',
    textAlign: 'center',
    marginBottom: 6,
    opacity: 0.85,
  },
  count: {
    fontSize: 14,
    color: '#0ff',
    textAlign: 'center',
    marginBottom: 2,
    opacity: 0.7,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#0ff',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  listContainer: {
    padding: 20,
    alignItems: 'center',
  },
  asteroidCard: {
    backgroundColor: 'rgba(20,30,60,0.7)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: STAR_COLOR,
    width: 340,
    shadowColor: '#0ff',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
  },
  asteroidHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  asteroidName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textShadowColor: '#0ff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  hazardBadge: {
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#ff0',
    textShadowColor: '#fff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  asteroidDetails: {
    gap: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#b3e0ff',
    marginBottom: 2,
    opacity: 0.85,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.7,
    textShadowColor: '#0ff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  emoji: {
    fontSize: 60,
    marginTop: 20,
  },
});

export default Asteroides;