import { View } from "react-native";
import { Stack, router } from "expo-router";

import RegisterForm from "@/components/RegisterForm";
import { useEffect } from "react";

export default function Register() {
    useEffect(() => {
        if(localStorage.getItem("token")){
            router.push("/profile");
        }
    }, []);

    return (
        <View className="default-container justify-center items-center">
            <Stack.Screen options={{ headerTitle: "Login Page" }} />
            <RegisterForm />
        </View>
    );
}