import { View } from "react-native";
import { Stack, router } from "expo-router";
import { useEffect } from "react";

import LoginForm from "@/components/LoginForm";

export default function Login() {
    useEffect(() => {
            if(localStorage.getItem("token")){
                router.push("/profile");
            }
        }, []);

    return (
        <View className="default-container justify-center items-center">
            <Stack.Screen options={{ headerTitle: "Login Page" }} />
            <LoginForm />
        </View>
    );
}