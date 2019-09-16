<template>
    <wc-swiper class="heigh">
        <wc-slide v-for="(item, k) in banner" :key="k">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imgLoad">
            </a>
        </wc-slide>
    </wc-swiper>
</template>

<script>
    export default {
        name: "HomeSwiper",
        props:{
            banner: {
                type: Array,
                default: () => []
            }
        },
        data(){
            return{
                flag: false
            }
        },
        methods: {
            imgLoad(){
                if(!this.flag){
                    this.$emit('imgLoad')
                    this.flag = !this.flag
                }

            }
        }
    }
</script>

<style scoped>
    .heigh img {
        height: 20%;
        width: 100%;

    }
</style>