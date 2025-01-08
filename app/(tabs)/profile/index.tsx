import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { Stack, Link, router, useFocusEffect } from "expo-router";

import { useEffect, useState, useCallback } from "react";
import { Image } from "expo-image";
import axios from "axios";

//components
import LikedSongs from "@/components/LikedSongs";
import LikedAlbums from "@/components/LikedAlbums";

const pfp = require('@/assets/images/undraw_male-avatar_zkzx.svg');

export default function Profile() {
	const [token, setToken] = useState(localStorage.getItem("token"));

    //API STATEs
    const [user, setUser] = useState(null);
    const [likedSongs, setLikedSongs] = useState([]);
    const [likedAlbums, setLikedAlbums] = useState([]);

    const api = "https://ajs-api.vercel.app/api/users/"
    // axios.get(api +, {

    useEffect(() => {
        setToken(localStorage.getItem("token"));

        if(!token){
            console.log("No token found");
            router.push("/profile/login");
        }
    }, [token]); //run once on component mount

    //handle functions
    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    }

    useFocusEffect(
        useCallback(() => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
    
            const fetchSongs = async () => {
                try {
                    const res = await axios.get("https://ajs-api.vercel.app/api/songs/get/liked", config);
                    setLikedSongs(res.data);
                    
                } catch (error) {
                    console.error(error);
                }
            }
    
            const fetchAlbums = async () => {
                try {
                    const res = await axios.get("https://ajs-api.vercel.app/api/albums/get/liked", config);
                    setLikedAlbums(res.data);
                } catch (error) {
                    console.error(error);
                }
            }
    
            fetchSongs();
            fetchAlbums();

            return () => {
                setLikedSongs([]);
                setLikedAlbums([]);
            }
        }, [])
    );

    if(!token){
        return (
            <View className="default-container justify-center">
                <Stack.Screen options={{ title: "Profile" }} />
                <Text>Please login to view this page</Text>
                <Link href="/profile/login">Login</Link>
            </View>
        )
    }

    return (
        <ScrollView className="default-container justify content-start pt-10">
            <Stack.Screen options={{ title: "Profile" }} />
            
            <View className="default-container !w-2/3">
                <View className="">
                    <div className="flex flex-row justify-between">
                        <Link href="/songs" className="text-white button-link">Songs</Link>
                        <Link href="/albums" className="text-white button-link">Albums</Link>
                        <Link href="/artists" className="text-white button-link">Artists</Link>
                    </div>
                    <Text className="text-white text-2xl font-bold">Profile</Text>
                    <hr className="border rounded" />
                    <div className="self-center !w-fit pb-10">
                        <Text className="text-white ">Welcome to your profile</Text>
                        <Image source={pfp} className="size-32 img-fix"/>
                        <Link href="./" className="text-white self-center" onPress={handleLogout}>Logout</Link>
                    </div>
                    <hr className="!pt-10 "/>
                    <View className="!x-32 flex flex-row justify-around">
                        <div className="!w-1/3">
                            <Text className="text-white text-lg font-bold">Liked Songs:</Text>
                            <hr className="border rounded "></hr>
                            <LikedSongs likedSongs={likedSongs} />
                        </div>
                        <hr className="h-inherit border" />
                        <div className="w-1/3">
                            <Text className="text-white text-lg font-bold">Liked Albums:</Text>
                            <hr className="border rounded "></hr>
                            <LikedAlbums likedAlbums={likedAlbums}/>
                        </div>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
