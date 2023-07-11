<script>
import axios from 'axios'
import GetMovies from '../services/GetMovies'
import MoviesComp from '../components/Movies/MoviesComp.vue'
import SearchedMovies from '../components/SearchedMovies/SearchedMovies.vue'

export default {
  data() {
    return {
      movies: [],
      Searcheds: [],
      TrendingMovies: [],
      searchTerm: '',
      timeout:null,
      showSearchBar: false,
      Results: true,
      genres: [],
      selectedGenre: null,
      movies: []
    }
  },
  components: {
    MoviesComp,
    SearchedMovies,
  },
methods: {

  async SearchMovie() {
    if(this.searchTerm === '') {
     return
    }
    try {
        const response = await GetMovies.SearchMovie(this.searchTerm);
        this.Searcheds = response.data.results
      } catch (error) {
        console.error(error);
      }
  },
  onInput() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.SearchMovie();
    }, 500)
    this.Results = false
    this.selectedGenre = false
  },  
  toggleSearchBar() {
      this.showSearchBar = !this.showSearchBar;
    },
},
async mounted() {
  try {
  const response = await GetMovies.getMovies();
  this.movies = response.data.results
  // console.log(response.data.results)
 } catch (error) {
  console.log(error)  
 }
  axios.get('https://api.themoviedb.org/3/genre/movie/list', {
        params: {
          api_key: '2171600dc8086e338779cf591214ec43',
          language: 'en-US'
        }
      })
      .then(response => {
        this.genres = response.data.genres;
      })
      .catch(error => {
        console.error(error);
      });
},
watch: {
      selectedGenre() {
        axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: '2171600dc8086e338779cf591214ec43',
            language: 'en-US',
            with_genres: this.selectedGenre
          }
        })
        .then(response => {
          this.movies = response.data.results;
        })
        .catch(error => {
          console.error(error);
        });
      }
    }
}
</script>

<template>
 <div class="input-main">
  <input   v-if="showSearchBar" type="text" v-model="searchTerm" class="input-child"  @input="onInput"> 
  <button @click="toggleSearchBar" class="search-icon-button">
    <i v-if="showSearchBar" class="fa-solid fa-x"></i>
      <i v-else class="fa-solid fa-magnifying-glass"></i>
    </button>
 </div>
 <div>
  <label for="genres">Genres:</label>
      <select v-model="selectedGenre" aria-placeholder="Genres" required>
        <option  v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
      </select>
        <div :key="selectedGenre" v-if="selectedGenre" class="flex">
        <div v-for="movie in movies" :key="movie.id" class="movies-container">
          <p>{{ movie.original_title }} </p>
          <router-link :to="`/about/${movie.id}`"><img   :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" alt=""></router-link>
        </div>
      </div>
    </div>  
 <div v-if="Results" class="Movies searched-movies">
  <MoviesComp v-for="(movie, index) in movies" :key="index" :movie="movie" />
</div>
<div class="searched-movies" > 
 <SearchedMovies v-for="(searched, index) in Searcheds" :key="index" :searched="searched" />
</div>

<div>
</div>
</template>

<style scoped>
.Movies {
  margin-top:70px;
}
.searched-movies {
  display:flex;
  flex-wrap:wrap;
  gap:70px;
  justify-content:center;
}
.input-main {
  text-align:center;
  top: 0;
  background-color: white;
  z-index: 1;
  padding: 10px;
}
.search-icon-button {
  border:none;
  background-color:white;
  position: relative;
  float:right;
  right:15%;
}
.input-child {
  padding:10px 17px;
  border-radius:15px;
  width:50%;
}
i {
  font-size:25px;
  cursor:pointer;
}
i:hover {
  color:#686de0;
  transition:all 0.3s;
}
.fa-x{
  color:#686de0;
  font-size: 20px;
}
a {
  text-decoration:none;
  color:black;
}
  .movies-container img {
    width:300px;
    justify-content: center;
}
.flex {
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  gap:70px;
}
</style>
