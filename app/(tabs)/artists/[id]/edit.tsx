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
    const [selectedAlbum, setSelectedAlbum] = useState();
    const [duration, setDuration] = useState(0);


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
        axios.get(`https://ajs-api.vercel.app/api/songs/${id}`)
            .then(response => {
                setTitle(response.data.title);
                setDuration(response.data.duration);
                setSelectedAlbum(response.data.albumId);
                setArtistIds(response.data.artists);
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
        console.log(title, artistIds, selectedAlbum, duration);
        if(artistIds.includes("Select artists") || artistIds.length < 1) {
            alert('select artists');
            return;
        }

        //check for duplicates
        const duplicate = artistIds.some((val, i) => artistIds.indexOf(val) !== i);
        if(duplicate) {
            alert('duplicate artists');
            return;
        }

        if(!selectedAlbum) {
            alert('select album');
            return;
        }

        if(!duration) {
            alert('enter duration');
            return;
        }

        if(!title) {
            alert('enter title');
            return;
        }

        const data = {
            title: title,
            artists: artistIds,
            albumId: selectedAlbum,
            duration: duration
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        axios.put('https://ajs-api.vercel.app/api/songs/' + id, data, config)
            .then(response => {
                console.log(response.data);
                router.push('/songs');
            })
            .catch(error => {
                console.log(error.response.data);
                alert('error creating song');
            });
            
    }
    const handleDuration = (e) => {
        setDuration(e.target.value);
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
            <Text className="text-lg mt-2">Select Album</Text>
            <Picker 
                selectedValue={selectedAlbum}
                onValueChange={(itemValue, itemIndex) => setSelectedAlbum(itemValue)}
                className="border border-gray-300 p-2 w-full mt-2 input-box"
            >
                <Picker.Item label="Select an album" value={null} />
                {albums.map(album => (
                    <Picker.Item key={album.id} label={album.title} value={album._id} />
                ))}
            </Picker>
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
            <Text className="text-lg mt-2">Duration (example, 4.15: 4 minutes, 15 seconds)</Text>
            <TextInput className="border border-gray-300 p-2 w-full mt-2 input-box" value={duration} onChange={handleDuration} />
            <button className="bg-blue-500 text-white p-2 w-full mt-2" onClick={handleSubmit}>Save Edits</button>
        </View>
    )
}