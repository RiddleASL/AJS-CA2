import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

export default function Like() {
    const {id} = useLocalSearchParams();
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        axios.post(`https://ajs-api.vercel.app/api/songs/${id}/add`, config)
        .then((res) => {            
            console.log(res.data);
            router.push("/songs");
        })
        .catch((err) => {
            console.log(err.response.data);
            router.push("/songs");
        });
    }, [id]);

}