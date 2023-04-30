<template>
    <div class="movies-container">
        <p>{{ movie.original_title }}</p>
    <router-link :to="`/about/${movie.id}`"><img  :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" alt=""></router-link>
    </div>
</template>

<script>
    export default {
        props: {
            movie: {
                required: true
            }
        }
    }
</script>

<style scoped>

.movies-container img {
    width:300px;
    justify-content: center;
}
@media only screen and (max-width:310px) {
    .movies-container img {
        width:100%;
    }
}
</style>