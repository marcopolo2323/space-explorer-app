import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router'; // ← Cambia esto

const AsteroidsScreen = () => { // ← Elimina { route }
  const { title } = useLocalSearchParams(); // ← Usa useLocalSearchParams
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
          colors={['#6366F1', '#8B5CF6']}
          style={styles.background}
        >
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="white" />
            <Text style={styles.loadingText}>Cargando asteroides...</Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        style={styles.background}
      >
        <View style={styles.header}>
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
              tintColor="white"
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No se encontraron asteroides</Text>
              <Text style={styles.emoji}>☄️</Text>
            </View>
          }
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
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 10,
  },
  count: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  listContainer: {
    padding: 20,
  },
  asteroidCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
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
    color: 'white',
    flex: 1,
  },
  hazardBadge: {
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 'bold',
  },
  asteroidDetails: {
    gap: 5,
  },
  detailText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  emoji: {
    fontSize: 60,
    marginTop: 20,
  },
});

export default AsteroidsScreen;