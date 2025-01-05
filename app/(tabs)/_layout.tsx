import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons'

export default function TabLayout() {
  return (
    <Tabs screenOptions={
      { 
        // Header styling
        headerStyle: {
          backgroundColor: "#011126",
          borderBottomWidth: 0,
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
          borderTopWidth: 0,
        }
      }
    }>
      <Tabs.Screen name="index" options={{ title: 'Home', }} />
      <Tabs.Screen name="details" options={{ title: 'About' }} />
    </Tabs>
  );
}
