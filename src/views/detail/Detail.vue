<template>
   <div id="detail">
       <DetailNav class="detailNav"></DetailNav>
       <Scroll class="scroll">
           <DetailSwiper :topImages="topImages" v-if="topImages.length"></DetailSwiper>
       </Scroll>


   </div>
</template>

<script>
    import DetailNav from './childComponents/DetailNav'
    import DetailSwiper from  './childComponents/DetailSwiper'

    import {getDetail} from '@network/detail'
    import Scroll from '@components/common/scroll/Scroll'

    export default {
        name: "Detail",
        components: {
            DetailNav,
            DetailSwiper,
            Scroll
        },
        data(){
            return {
                iid: null,
                topImages: []   /*商品详情轮播图*/
            }
        },
        created() {
            this.iid = this.$route.params.iid;
            getDetail(this.iid).then(res => {
                this.topImages = res.data.result.itemInfo.topImages;    /*商品详情轮播图*/
            })

        }
    }
</script>

<style scoped>
    .detailNav {
        /*margin-bottom: 44px;*/
    }
    #detail {
        position: relative;
        height: 100vh;

    }
    #detail .scroll {
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
</style>