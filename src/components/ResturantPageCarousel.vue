<template>
    <div>
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img :src="banner.banner == null ? '@/assets/images/banner.png': banner.banner.fileUrl" class="d-block w--100" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ResturantPageCarousel',
    props:{
        banner:{
            type: Object
        }
    }
}
</script>
<style scoped>
    .w--100{
        width: 100%;
        height: 250px;
    }
    @media only screen and (min-width: 768px) {
        .w--100{
            height: 380px;
        } 
    }
</style>