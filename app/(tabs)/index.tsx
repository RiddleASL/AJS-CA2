import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";
import * as Navbar from "expo-navigation-bar"

export default function Index() {
  return (
    <View className="default-continer">
      <Stack.Screen options={{ title: "Home" }} />

      <View className="bg-warning">
        <Text>this is a test</Text>
        <Link href="/details">Details</Link>
      </View>
    </View>
  );
}
