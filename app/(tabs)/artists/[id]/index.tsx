import { useLocalSearchParams, Link, router, useFocusEffect} from "expo-router";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import * as Updates from "expo-updates";
import { Image } from "expo-image";
import axios, { Axios } from "axios";
import { useEffect, useState, useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

//assets
const defaultImage = require("@/assets/images/3580074.png");

export default function Artist() {
	const { id } = useLocalSearchParams(); // This would be the song ID from the route
	let [token, setToken] = useState(localStorage.getItem("token"));

	let [song, setSong] = useState([]);

	// Fetch the song data
	useEffect(() => {
		setToken(localStorage.getItem("token"));
		setSong([]);
		axios
			.get(`https://ajs-api.vercel.app/api/artists/${id}`)
			.then((response) => {
				setSong(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	//update token
	useFocusEffect(
		useCallback(() => {
			setToken(localStorage.getItem("token"));
		}, [])
	);


	const options = () => {
		return (
			<div className="py-5">
				<Text className="text-white text-3xl font-bold w-1/2 mb-2">
					Artist Options:
				</Text>
				<View className="flex flex-row gap-3 justify-center">
					<Link
						className="button-box w-fit self-center text-white font-bold"
						href={`/artists/${id}/edit`}
					>
						Edit
					</Link>
					<Link
						className="button-box w-fit self-center text-white font-bold"
						href={`/artists/${id}/delete`}
					>
						Delete
					</Link>
				</View>

				<hr className="border-2 rounded mt-10" />
			</div>
		);
	};

	return (
		<ScrollView className="default-container">
			<View className="default-container !w-3/4">
				{token ? options() : null}
				<div className="self-center !w-fit pb-10 flex flex-col pt-10">
					<Image
						source={defaultImage}
						className="size-32 img-fix self-center"
					/>
					<div className="flex flex-row gap-3 justify-center">
						<Text className="text-white text-3xl font-bold">{song?.name}</Text>
					</div>
					<Text className="text-white text-2xl font-bold text-center">{song?.genre}</Text>
				</div>
			</View>

			<hr className="!py-10" />

		</ScrollView>
	);
}
