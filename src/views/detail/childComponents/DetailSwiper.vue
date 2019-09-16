<template>
    <wc-swiper class="heigh">
        <wc-slide v-for="(item, k) in topImages" :key="k">
            <img :src="item" alt="">
        </wc-slide>
    </wc-swiper>
</template>

<script>
    export default {
        name: "DetailSwiper",
        props: {
            topImages: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style scoped>
    .heigh {
        height: 330px;
    }
    .heigh img {
        width: 100%;
    }
</style>