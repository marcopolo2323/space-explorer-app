// app/(tabs)/_layout.tsx (layout de las tabs)
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

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
            <MaterialCommunityIcons name="earth" size={size + 4} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="curiosidades"
        options={{
          title: 'Curiosidades',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="telescope" size={size + 4} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="minijuegos"
        options={{
          title: 'Minijuegos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="rocket" size={size + 4} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}