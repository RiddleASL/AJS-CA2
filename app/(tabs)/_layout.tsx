import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons'

export default function TabLayout() {

  return (
    <Tabs screenOptions={
      { 
        // Header styling
        headerStyle: {
          backgroundColor: "#011126",
          borderBottomWidth: 1,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "center",

        // Tab styling
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#012E40",
        tabBarStyle: {
          backgroundColor: "#011126",
          borderTopWidth: 1,
          borderColor: "#fff",
          height: 75,
          paddingTop: 10,
        }
      }
    }>
      <Tabs.Screen name="index" options={{ title: 'Songify', tabBarIcon: ({color, focused}) => (<Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24}/>)}} />
      <Tabs.Screen name="search" options={{ title: 'Search', tabBarIcon: ({color, focused}) => (<Ionicons name={focused ? 'search' : 'search-outline'} color={color} size={24}/>)}} />
      <Tabs.Screen name='profile' options={{ title: 'Profile', tabBarIcon: ({color, focused}) => (<Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24}/>)}} />
      <Tabs.Screen name='songs' options={{ href: null }} />
      <Tabs.Screen name='albums' options={{ href: null }} />
      <Tabs.Screen name='artists' options={{ href: null }} />
    </Tabs>
  );
}
