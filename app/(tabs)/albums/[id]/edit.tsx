import axios from "axios"
import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import {Picker } from '@react-native-picker/picker';
import Ionicons from "@expo/vector-icons/Ionicons";
import MultiSelect from 'react-native-multiple-select';
import { router, useLocalSearchParams } from "expo-router";

export default function Edit() {
    const {id} = useLocalSearchParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const token = localStorage.getItem('token');

    //form data
    const [title, setTitle] = useState('');
    const [artistIds, setArtistIds] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);


    useEffect(() => {
        axios.get('https://ajs-api.vercel.app/api/albums')
            .then(response => {
                setAlbums(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.response.data);
                setLoading(false);
            });

        axios.get('https://ajs-api.vercel.app/api/artists')
            .then(response => {
                setArtists(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.response.data);
                setLoading(false);
            });

        //fetch song data
        axios.get(`https://ajs-api.vercel.app/api/albums/${id}`)
            .then(response => {
                setTitle(response.data.title);
                setArtistIds(response.data.artists);
                for (let index = 0; index < response.data.artists.length -1; index++) {
                    addArtistInput();                    
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const addArtistInput = () => {
        console.log('add artist input');
        const input = 
        <Picker
            selectedValue={artistIds[artistInputs.length + 1] || null}
            onValueChange={(itemValue, itemIndex) => addArtist(itemValue)}
            className="border border-gray-300 p-2 w-full mt-2 input-box"
        >
            <Picker.Item label="Select artists" value={null} />
            {artists.map(artist => (
                <Picker.Item key={artist.id} label={artist.name} value={artist._id} />
            ))}
        </Picker>
        setArtistInputs( artistInputs => 
            [...artistInputs, input]
        )
    }

    const removeArtistInput = () => {
        console.log('remove artist input');
        setArtistInputs( artistInputs => 
            artistInputs.slice(0, artistInputs.length - 1)
        )
        setArtistIds( artistIds => artistIds.slice(0, artistIds.length - 1));
    }
    
    //render artist inputs
    const [artistInputs, setArtistInputs] = useState([]);
    const renderArtistInputs = () => {
        return artistInputs.map(input => input);
    }

    const handleSubmit = () => {
        console.log('submit form');

        //check for duplicates
        const duplicate = artistIds.some((val, i) => artistIds.indexOf(val) !== i);
        if(duplicate) {
            alert('duplicate artists');
            return;
        }


        if(!title) {
            alert('enter title');
            return;
        }

        const data = {
            title: title,
            artists: artistIds,
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        axios.put('https://ajs-api.vercel.app/api/albums/' + id, data, config)
            .then(response => {
                console.log(response.data);
                router.push('/albums');
            })
            .catch(error => {
                console.log(error.response.data);
                alert('error creating song');
            });
            
    }
    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const addArtist = (artistId) => {
        if(artistIds.includes(artistId)) {
            return;
        } else {
            setArtistIds([...artistIds, artistId]);
        }
        
    }

    return (
        <View className="default-container">
            <Text className="text-2xl font-bold">Create a new song</Text>
            <Text className="text-lg mt-2">Song Title</Text>
            <TextInput className="border border-gray-300 p-2 w-full mt-2 input-box" value={title} onChange={handleTitle}/>
            <hr className="border border-2 border-white rounded my-2" />
            {/* multiple select for artists */}
            <Text className="text-lg mt-2">Select Artists</Text>
            <Picker 
                selectedValue={artistIds[0] || null}
                onValueChange={(itemValue, itemIndex) => addArtist(itemValue)}
                className="border border-gray-300 p-2 w-full mt-2 input-box"
            >
                <Picker.Item label="Select artists" value={null} />
                {artists.map(artist => (
                    <Picker.Item key={artist.id} label={artist.name} value={artist._id} />
                ))}
            </Picker>
            {renderArtistInputs()}
            <div className="flex justify-between">
                {artistInputs.length >= 3  ? "" : <TouchableOpacity className="!w-fit" onPress={addArtistInput}><Ionicons name='add-circle' size={24} className="p-2" color={'white'}/> </TouchableOpacity> }
                {artistInputs.length < 1 ? "" : <TouchableOpacity className="!w-fit" onPress={removeArtistInput}><Ionicons name='remove-circle' size={24} className="p-2" color={'white'}/> </TouchableOpacity> }
            </div>
            <hr className="border border-2 border-white rounded my-2" />
            <button className="bg-blue-500 text-white p-2 w-full mt-2" onClick={handleSubmit}>Save Edits</button>
        </View>
    )
}