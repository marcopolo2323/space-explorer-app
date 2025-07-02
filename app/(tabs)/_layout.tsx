// app/(tabs)/_layout.tsx (layout de las tabs)
import { Tabs } from 'expo-router';
import { View } from 'react-native';

// Interfaz para las props de los íconos
interface IconProps {
  color: string;
  size: number;
}

// Componentes de íconos simples con tipos
const PlanetIcon = ({ color, size }: IconProps) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color,
      borderWidth: 2,
      borderColor: color,
    }}
  />
);

const StarIcon = ({ color, size }: IconProps) => (
  <View
    style={{
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderTopWidth: size * 0.4,
      borderRightWidth: size * 0.15,
      borderBottomWidth: size * 0.4,
      borderLeftWidth: size * 0.15,
      borderTopColor: color,
      borderRightColor: 'transparent',
      borderBottomColor: color,
      borderLeftColor: 'transparent',
      transform: [{ rotate: '35deg' }],
    }}
  />
);

const GameIcon = ({ color, size }: IconProps) => (
  <View
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: 4,
    }}
  />
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1a1a2e',
          borderTopColor: '#4a6fa5',
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#7b68ee',
        tabBarInactiveTintColor: '#cccccc',
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          textTransform: 'uppercase',
        },
      }}
    >
      <Tabs.Screen
        name="planetas"
        options={{
          title: 'Planetas',
          tabBarIcon: ({ color, size }) => (
            <PlanetIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="curiosidades"
        options={{
          title: 'Curiosidades',
          tabBarIcon: ({ color, size }) => (
            <StarIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="minijuegos"
        options={{
          title: 'Minijuegos',
          tabBarIcon: ({ color, size }) => (
            <GameIcon color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}