import axios from "axios";
import { View, ScrollView, Text, Appearance, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";

export default function Search() {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchData();
		setSearchQuery(searchQuery)
		console.log(searchResults);
		
	}, [searchQuery]);

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	}

	const fetchData = async () => {
		try {
			const [songs, albums, artists] = await Promise.all([
				axios.get(`https://ajs-api.vercel.app/api/songs/`),
				axios.get(`https://ajs-api.vercel.app/api/albums/`),
				axios.get(`https://ajs-api.vercel.app/api/artists/`)
			]);

			const songResults = songs.data.filter((song) => song.title.toLowerCase().includes(searchQuery.toLowerCase()));
			const albumResults = albums.data.filter((album) => album.title.toLowerCase().includes(searchQuery.toLowerCase()));
			const artistResults = artists.data.filter((artist) => artist.name.toLowerCase().includes(searchQuery.toLowerCase()));

			setSearchResults([...songResults, ...albumResults, ...artistResults]);
			setLoading(false);
		} catch (err) {
			setError(err.response.data.msg);
			console.log(err);
			setLoading(false);
		}
	}

	const renderResults = () => {
		if(loading){
			return (
				<View className="default-container justify-center items-center">
					<Text>Loading...</Text>
				</View>
			)
		}

		if(error){
			return (
				<View className="default-container justify-center items-center">
					<Text>Error: {error}</Text>
				</View>
			)
		}

		return (
			searchResults.map((result) => (
					(result.title) ? (
						<div className="flex flex-row justify-between !content-center border-b-2 my-2 pb-2 rounded-b" key={result.id}>
							<div className="flex flex-col ps-16">
								<Link href={result.duration ? `/songs/${result._id}` : `/albums/${result._id}`} className="text-white font-bold text-3xl button-link !text-start">{result.title}</Link>
								{(result.duration) ? <Text className="text-white text-lg">{`${result.duration.toString().split(".")[0]} Minutes, ${result.duration.toString().split(".")[1]} seconds.`}</Text> : Date("2024-11-15T20:48:53.906Z")}
							</div>
						</div>
					) : (
						<div className="flex flex-row justify-between border-b-2 my-2 pb-2 rounded-b" key={result.id}>
							<div className="flex flex-col ps-16">
								<Link href={`/artists/${result._id}`} className="text-white font-bold text-3xl button-link !text-start">{result.name}</Link>
								<Text className="text-white text-lg">Genre: {result.genre}</Text>
							</div>
						</div>
					)
				))
		)

	}

	return (
		<ScrollView className="default-container items-center">
			<View className="!default-container mx-32 pt-10">
				<View className="input-box flex flex-row justify-between">
					<TextInput placeholder="Search for a song, album, or artist" className="w-11/12 " onChange={handleSearch}/>
					<Ionicons name="search" size={24} color="white" />
				</View>
				<hr className="border rounded my-5"/>
				{renderResults()}
			</View>
		</ScrollView>
	);
}

