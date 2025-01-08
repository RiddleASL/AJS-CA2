import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';

export default function Artists() {
    let [artists, setartists] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://ajs-api.vercel.app/api/artists')
            .then(response => {
                console.log(response.data);
                
                setartists(response.data);
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

    const songList = artists.map((song) => (
        <div>
            <hr className='border-2 rounded'/>
            <li key={song._id} className='!list-none flex items-center gap-5 p-5 bg-gray-800 rounded-lg my-2'>
                <Ionicons name='person' size={24} color='white'/>
                <Link className="text-white text-3xl font-bold" href={`/artists/${song._id}`}>{song.name}</Link>
                <Ionicons name='person' size={24} color='white'/>
            </li>
            <hr className='border-2 rounded'/>
        </div>
    ));

    return (
        <ScrollView className='default-container'>
            <Link className='button-box w-fit self-center font-bold' href='/artists/create'>Create a song</Link>
            <hr className='border-2 rounded mt-2'/>
            <View className='default-container py-10'>
                <Text className='text-white text-3xl font-bold w-1/2 mb-2'>artists:</Text>
                {songList}
            </View>
        </ScrollView>
    );
}