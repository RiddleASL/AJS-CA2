import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

export default function Remove() {
    const {id} = useLocalSearchParams();
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        axios.delete(`https://ajs-api.vercel.app/api/songs/${id}/remove`, config)
        .then((res) => {
            console.log(res.data);
            router.push("/songs");
        })
        .catch((err) => {
            console.log(err.response.data);
            router.push("/songs");
        });
    }, []);

}