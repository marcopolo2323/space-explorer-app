// app/index.tsx (pantalla de inicio)
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const handleStartExploration = () => {
    router.push('/(tabs)/planetas');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f23" />
      
      {/* Background with stars effect */}
      <LinearGradient
        colors={['#0f0f23', '#1a1a2e', '#16213e']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <View style={styles.planetIcon} />
              <Text style={styles.appName}>INKANAZCA</Text>
            </View>
            <Text style={styles.dateTime}>27/06/25 16:22</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={styles.mainTitle}>EXPLORA EL UNIVERSO</Text>
          
          {/* Nebula Image Container */}
          <View style={styles.imageContainer}>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=250&fit=crop' }}
              style={styles.nebulaImage}
              imageStyle={styles.imageStyle}
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
                style={styles.imageOverlay}
              />
            </ImageBackground>
            
            {/* Image Label */}
            <View style={styles.imageLabel}>
              <Text style={styles.imageLabelText}>nebulosa de oreon 2015</Text>
            </View>
          </View>

          {/* Lorem Ipsum Text */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              Lorem ipsum ahfddnflnadf{'\n'}
              adfjh hadlfj lajdhf añldjh{'\n'}
              aldhf ljhad frlij aj dh{'\n'}
              jhlñsdj frlj ñahdñ ladhf ldj{'\n'}
              adñlfdl lk jdñd fj
            </Text>
          </View>

          {/* Start Button */}
          <TouchableOpacity 
            style={styles.startButton}
            onPress={handleStartExploration}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#4a6fa5', '#7b68ee']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>COMENZAR EXPLORACIÓN</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Decorative Stars */}
        <View style={styles.starsContainer}>
          {[...Array(20)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.star,
                {
                  top: Math.random() * height,
                  left: Math.random() * width,
                  opacity: Math.random() * 0.8 + 0.2,
                }
              ]}
            />
          ))}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planetIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4a6fa5',
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#7b68ee',
  },
  appName: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateTime: {
    color: '#cccccc',
    fontSize: 14,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  mainTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 2,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  nebulaImage: {
    width: width * 0.8,
    height: 200,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 15,
  },
  imageOverlay: {
    flex: 1,
    borderRadius: 15,
  },
  imageLabel: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: -25,
    zIndex: 2,
  },
  imageLabelText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  descriptionContainer: {
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  descriptionText: {
    color: '#cccccc',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
  },
  startButton: {
    alignSelf: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#7b68ee',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    paddingHorizontal: 40,
    paddingVertical: 18,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  starsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  star: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: '#ffffff',
    borderRadius: 1,
  },
});
