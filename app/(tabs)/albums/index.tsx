import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';

export default function Albums() {
    let [albums, setAlbums] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://ajs-api.vercel.app/api/albums')
            .then(response => {
                console.log(response.data);
                
                setAlbums(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    if(loading){
        return (
            <View className="default-container justify-center items-center">
                <Text>Loading...</Text>
            </View>
        )
    }

    const songList = albums.map((song) => (
        <div>
            <hr className='border-2 rounded'/>
            <li key={song._id} className='!list-none flex items-center gap-5 p-5 bg-gray-800 rounded-lg my-2'>
                <Ionicons name='musical-notes' size={24} color='white'/>
                <Link className="text-white text-3xl font-bold" href={`/albums/${song._id}`}>{song.title}</Link>
            </li>
            <hr className='border-2 rounded'/>
        </div>
    ));

    return (
        <ScrollView className='default-container'>
            <Link className='button-box w-fit self-center font-bold' href='/albums/create'>Create an Album</Link>
            <hr className='border-2 rounded mt-2'/>
            <View className='default-container py-10'>
                <Text className='text-white text-3xl font-bold w-1/2 mb-2'>Albums:</Text>
                {songList}
            </View>
        </ScrollView>
    );
}