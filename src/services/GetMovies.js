import axios from 'axios';

const apikey = 'api_key=2171600dc8086e338779cf591214ec43'
const baseUrl = 'https://api.themoviedb.org/3/'


export default {
    getMovies() {
        return axios.get(`${baseUrl}movie/popular?${apikey}`)
    },
    async getInnerMovies(id) {
        const responseMovies = await axios.get(`${baseUrl}movie/${id}?${apikey}&language=en-US`);
        return responseMovies.data;
    },
    SearchMovie(searchTerm) {
        return axios.get(`${baseUrl}search/movie?${apikey}&language=en-US&query=${searchTerm}&page=1&include_adult=false`) 
    }
}