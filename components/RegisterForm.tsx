import {useEffect, useState} from 'react';
import axios from 'axios';
import { View, Text, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function LoginForm() {
    //Form States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPass, setConfPass] = useState('');
    const [email, setEmail] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [showPass1, setShowPass1] = useState(false);

    //API States
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    // API URL
    const apiURL = 'https://ajs-api.vercel.app/api/users/';

    // Handle functions
    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        if(password !== confPass){
            setError({msg: "Passwords do not match"});
            setLoading(false);
        }

        try {
            const response = await axios.post(apiURL + "register", {
                username: username,
                password: password,
                email: email
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
    const handleShowPass1 = () => {
        setShowPass1(!showPass1);
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
            <Text className="input-header">Confirm Password</Text>
            <View className='input-password'>
                <TextInput
                    secureTextEntry={!showPass1}
                    className='password-text'
                    value={confPass}
                    onChangeText={setConfPass}
                    placeholder="Confirm Password"
                />
                <Ionicons onPress={handleShowPass1} name={!showPass1 ? 'eye-off' : 'eye'} size={24} color="white" />
            </View>
            <View className='gap-2'>
                <TouchableOpacity onPress={handleLogin} className='button-box'> <Text className='button-text'> Register </Text></TouchableOpacity>
                <Link href="/profile/login" className='button-link'>Login</Link>
            </View>
        </View>
    )

}