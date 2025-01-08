import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

export default function ImageContainer(props: {source: any}) {
    return (
        <Image source={props.source}/>
    );
}