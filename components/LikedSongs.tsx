import axios from 'axios';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export default function LikedSongs( {likedSongs} ) {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        setSongs([]);
        if(likedSongs){
            console.log("Liked songs: ", likedSongs);
            
            likedSongs.forEach(song => {
                console.log(song.songId);

                axios.get(`https://ajs-api.vercel.app/api/songs/${song.songId}`)
                .then((res) => {
                    setSongs(songs => [...songs, res.data]);
                    console.log(res.data);
                })
            })
        }
    }, [likedSongs]);

    if(songs.length === 0){
        return (
            <View>
                <Text className='text-white font-bold'>No liked songs</Text>
            </View>
        )
    }

    return (
        <ul>
            {songs.map((song) => (
                <li>
                    <Link href={`/songs/${song._id}`} className='button-link' key={song._id}>{song.title}</Link>
                </li>
            ))}
        </ul>
    )
}