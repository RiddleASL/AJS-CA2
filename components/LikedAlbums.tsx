import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link} from 'expo-router';
import { View, Text } from 'react-native';

export default function LikedAlbums({likedAlbums}) {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        setAlbums([]);
        if(likedAlbums){
            console.log("Liked songs: ", likedAlbums);
            
            likedAlbums.forEach(album => {
                console.log(album.songId);

                axios.get(`https://ajs-api.vercel.app/api/albums/${album.albumId}`)
                .then((res) => {
                    setAlbums(albums => [...albums, res.data]);
                    console.log(res.data);
                })
            })
        }
    }, [likedAlbums]);

    if(albums.length === 0 || !albums){
        return (
            <View>
                <Text className='text-white font-bold'>No liked albums</Text>
            </View>
        )
    }

    return (
        <ul>
            {albums.map((album) => (
                <li>
                    <Link href={`/albums/${album._id}`} className='button-link' key={album._id}>{album.title}</Link>
                </li>
            ))}
        </ul>
    )
}