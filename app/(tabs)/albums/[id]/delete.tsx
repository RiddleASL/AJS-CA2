import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import {router} from "expo-router";

export default function Delete() {
    const {id} = useLocalSearchParams();
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        axios.delete(`https://ajs-api.vercel.app/api/albums/${id}`, config)
        .then((res) => {
            console.log(res.data);
            router.push("/albums");
        })
        .catch((err) => {
            console.log(err.response.data);
            router.push("/albums");
        });
    }, []);
}