<template>
    <div id="GoodsListItem" @click="goodsItem">

        <img :src="popList.show.img" alt="" @load="imgLoad">    <!--load事件每加载一张图片执行一次-->
        <p class="title">{{ popList.title }}</p>
        <span class="price">{{ popList.price }}</span>
        <span class="cfav">{{ popList.cfav }}</span>

    </div>
</template>

<script>
    export default {
        name: "GoodsListItem",
        props: {
            popList: {
                type: Object,
                defaults: () => {}
            }
        },
        methods: {
            imgLoad(){  /*load事件每加载一张图片执行一次*/
                this.$bus.$emit('imgLoad')  /*$bus自定义的名字*/
            },
            goodsItem(){
                this.$router.push('/detail/'+ this.popList.iid);
            }
        },
        created() {

        }
    }
</script>

<style scoped>
#GoodsListItem {
    width: 48%;
}

#GoodsListItem p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

#GoodsListItem img{
    width: 100%;
    border-radius: 5px;
}

</style>