<script>
import GetMovies from '../services/GetMovies'
import axios from 'axios';

export default {
  data() {
    return {
      movie: [],
      video:[]
    }
  },
async mounted() {
  const id = this.$route.params.id;
    this.movie = await GetMovies.getInnerMovies(id);

    axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}/videos?api_key=2171600dc8086e338779cf591214ec43&language=en-US`)
  .then(response => {
    this.video = response.data.results[0].key
  })
},
}
</script>

<template>
  <div v-if="movie" class="d-grid">
    <div><img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" alt=""><br></div>
    <div>
      <p>  {{ movie.title }}</p>
<p class="overview">{{ movie.overview }}</p>
<p>Vote Average: {{ movie.vote_average }}</p>
<div v-if="video" class="youtube-video">
  <iframe :src="'https://www.youtube.com/embed/' + video " frameborder="0"></iframe>
</div>
</div>
<router-view />
</div>
</template>

<style scoped>
.youtube-video {
  border:1px solid red;
}
iframe {
  width:100%;
  height:500px;
}
.d-grid {
  display:flex;
  gap:30px;
  justify-content:center;
}
@media only screen and (max-width:700px) {
  .d-grid {
    flex-wrap:wrap
  }
  img {
    width:100%;
  }
  .youtube-video {
    width:100%;
  }
}
</style>
