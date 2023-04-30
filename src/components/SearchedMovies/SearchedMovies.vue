<template>
    <div class="movie-container">
        <p>{{ searched.original_title }}</p><br>
    <router-link  :to="`/about/${searched.id}`" ><img :src="'https://image.tmdb.org/t/p/w500/' + searched.poster_path" alt=""></router-link>
    </div>
</template>

<script>
    export default {
        props: {
            searched: {
                required:true
            }
        }
    }
</script>

<style scoped>
img {
    width:300px;
}
.movie-container {
    margin-top:70px;
}
</style>