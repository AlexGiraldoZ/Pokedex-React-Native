import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          title: 'Pokédex',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#DC0A2D' }, 
          headerTitleStyle: { color: 'white', fontWeight: 'bold' }
        }} 
      />
    <Stack.Screen 
        name="pokemon/PokemonDetail"
        options={{ 
          headerShadowVisible: false,
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#DC0A2D' }, 
          headerBackTitleVisible: false, 
          title: ''
        }}
      />
    </Stack>
  );
}
