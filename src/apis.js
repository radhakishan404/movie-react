import axios from "axios";

const getMovieList = async () => {
    try {
        let data = await axios.get("http://localhost:3001/movie");
        return data?.data;
    } catch (error) {
        alert("error");
    }
}

export {
    getMovieList
}