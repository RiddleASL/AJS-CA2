import {useEffect, useState} from 'react';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';

export default function LoginForm() {
    //Form States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPass, setShowPass] = useState(false);

    //API States
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [data, setData] = useState();

    // API URL
    const apiURL = 'https://ajs-api.vercel.app/api/users/';

    // Handle functions
    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(apiURL + "login", {
                username: username,
                email: email,
                password: password
            });
            router.push('/profile');
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            setError(error.response.data);
            console.log(error.response.data);
        }
        setLoading(false);
    }
    const handleShowPass = () => {
        setShowPass(!showPass);
    }

    if(loading) return <ActivityIndicator size="large" color="#0000ff" />

    return (
        <View className='card-box'>
            {error && <Text className="error">{error.msg}</Text>}
            <Text className="input-header">Username</Text>
            <TextInput
                className='input-box'
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
            />
            <Text className="input-header">Email</Text>
            <TextInput
                className='input-box'
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
            />
            <Text className="input-header">Password</Text>
            <View className='input-password'>
                <TextInput
                    secureTextEntry={!showPass}
                    className='password-text'
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Confirm Password"
                />
                <Ionicons onPress={handleShowPass} name={!showPass ? 'eye-off' : 'eye'} size={24} color="white" />
            </View>
            <View className='gap-2'>
                <TouchableOpacity onPress={handleLogin} className='button-box'> <Text className='button-text'> Login </Text></TouchableOpacity>
                <Link href="/profile/register" className='button-link'>Register</Link>
            </View>
        </View>
    )

}