import { useLocalSearchParams, Link, router, useFocusEffect } from "expo-router";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import * as Updates from "expo-updates";
import { Image } from "expo-image";
import axios, { Axios } from "axios";
import { useCallback, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

//assets
const defaultImage = require("@/assets/images/3580074.png");

export default function Album() {
	const { id } = useLocalSearchParams(); // This would be the song ID from the route
	let [token, setToken] = useState(localStorage.getItem("token"));

	let [album, setalbum] = useState(null);
	let [artistIds, setArtistIds] = useState([]);
	let [artists, setArtists] = useState([]);

	let [liked, setLiked] = useState(false);

	// Fetch the album data
	useFocusEffect(
        useCallback(() => {
            setToken(localStorage.getItem("token"));
            setArtists([]);
            setalbum(null);
            axios
                .get(`https://ajs-api.vercel.app/api/albums/${id}`)
                .then((response) => {
                    setalbum(response.data);
                    setArtistIds(response.data.artists);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
    
            //Check if the album is liked
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
    
            axios
                .get(`https://ajs-api.vercel.app/api/albums/get/liked`, config)
                .then((response) => {                
                    console.log(response.data);
                    
                    response.data.forEach((album) => {
                        console.log(album.albumId);
    
                        if (album.albumId === id) {
                            setLiked(true);
                        }
                    });
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }, [])
    )

	//Get the artists
	useEffect(() => {
		if (album) {
			artistIds.forEach((id) => {
				axios
					.get(`https://ajs-api.vercel.app/api/artists/${id}`)
					.then((response) => {
						setArtists((artists) => [...artists, response.data]);
						console.log(response.data);
					})
					.catch((error) => {
						console.error(error);
					});
			});
		}
	}, [album]);

    //update token
    useFocusEffect(
        useCallback(() => {
            setToken(localStorage.getItem("token"));
        }, [])
    )

	//Handle Functions
	const handleLike = () => {
        console.log(id);
        
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		axios
			.post(`https://ajs-api.vercel.app/api/albums/${id}/add`, {}, config)
			.then((response) => {
				console.log(response.data);
				setLiked(true);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleDislike = () => {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		axios
			.delete(`https://ajs-api.vercel.app/api/albums/${id}/remove`, config)
			.then((response) => {
				console.log(response.data);
				setLiked(false);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	//Render Artist names
	const renderArtists = () => {
		return artists.map((artist) => {
			return (
				<Text key={artist.id} className="text-white">
					{artist.name}
				</Text>
			);
		});
	};

	//Render like button
	const renderLikeButton = () => {
		if (token) {
			if (liked) {
				return (
					<TouchableOpacity
						className="button-box w-fit self-center flex gap-1 flex-row"
						onPress={handleDislike}
					>
						Remove from likes
						<Ionicons name="heart-dislike" size={24} color="red" />
					</TouchableOpacity>
				);
			} else {
				console.log(liked);

				return (
					<TouchableOpacity
						className="button-box w-fit self-center flex gap-1 flex-row"
						onPress={handleLike}
					>
						Add to likes
						<Ionicons name="heart-outline" size={24} color="red" />
					</TouchableOpacity>
				);
			}
		}

		return (
			<Link className="button-box w-fit self-center" href={"/profile/login"}>
				Login to like
			</Link>
		);
	};

	const options = () => {
		return (
			<div className="py-5">
				<Text className="text-white text-3xl font-bold w-1/2 mb-2">
					album Options:
				</Text>
				<View className="flex flex-row gap-3 justify-center">
					<Link
						className="button-box w-fit self-center text-white font-bold"
						href={`/albums/${id}/edit`}
					>
						Edit
					</Link>
					<Link
						className="button-box w-fit self-center text-white font-bold"
						href={`/albums/${id}/delete`}
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
						<Text className="text-white text-3xl font-bold">
							{album?.title}
						</Text>
					</div>
				</div>
				<div className="flex flex-row gap-3 justify-between">
					<div className="flex flex-col w-1/2">
						<Text className="text-white text-lg font-bold border-b-2 border-white w-1/2">
							Artists:
						</Text>
						{renderArtists()}
					</div>
                    <div className="flex flex-col w-1/2">
                        <Text className="text-white text-lg font-bold border-b-2 border-white w-1/2">
                            Released:
                        </Text>
                        <Text className="text-white">{Date(album?.releaseDate)} </Text>
                    </div>
				</div>
			</View>

			<hr className="!py-10" />

			{renderLikeButton()}
		</ScrollView>
	);
}
