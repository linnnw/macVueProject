<template>
    <Navbar>
        <div slot="left" class="back" @click="back">
            <img src="~@assets/images/detailBack.svg" alt="">
        </div>
        <div slot="center"  class="navBarCenter">
            <span v-for="(item,k) in nav" :class="{avtive: k==currentIndex}" @click="navItem(k)">{{ item }}</span>
        </div>
    </Navbar>
</template>

<script>
    import Navbar from '@components/common/navbar/Navbar'
    export default {
        name: "DetailNav",
        data(){
          return {
              nav: ['商品','参数','评论','推荐'],
              currentIndex: 0
          }
        },
        components: {
            Navbar
        },
        methods: {
            back(){
                this.$router.back()
            },
            navItem(k){
                this.currentIndex = k;
            }
        }
    }
</script>

<style scoped>
    .back {
        margin-top: 7px;
    }
    .back img {
        width: 30px;
    }
    .navBarCenter {
        color: #6c6c6c;
        display: flex;
    }
    .navBarCenter span {
        flex: 1;
    }
    .avtive {
        color: #f10;
    }
</style>