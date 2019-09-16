<template>
    <div id="home">
        <Navbar class="nb-color">
            <div slot="center">购物街</div>
        </Navbar>
        <HomeNav
                v-show="fixed"
                class="homeNav2"
                :title="['流行','新款','精选']"
                @currentIndex="curindex"
                ref="homeNav1"></HomeNav>
        <Scroll class="scroll"  ref="scroll" @bTop="bToTop" :probeType="3" @pulling="pulling" :pullUpLoad="true">    <!--滑动屏幕插件-->
            <HomeSwiper :banner="bannerList" v-if="bannerList.length" @imgLoad="goodsImgLoad"></HomeSwiper>     <!--轮播v-if防止数据还没获取到子组件就创建完成了-->
            <HomeRecommend :recommend="recommendList" v-if="recommendList.length"></HomeRecommend>
            <HomePopular></HomePopular>
            <HomeNav :title="['流行','新款','精选']" @currentIndex="curindex" ref="homeNav"></HomeNav>
            <GoodsList :goodsList="goodsListData"></GoodsList>

        </Scroll>
        <BackTop @click.native="backTop"  v-show="flag" ></BackTop>
    </div>
</template>

<script>


    import HomeSwiper from './childComponents/HomeSwiper'
    import HomeRecommend from './childComponents/HomeRecommend'
    import HomePopular from './childComponents/HomePopular'
    import HomeNav from './childComponents/HomeNav'
    import GoodsList from '@components/content/GoodsList'
    import Navbar from '@components/common/navbar/Navbar'


    import { getHomeMultidata,getHomeData } from '@network/home'
    import Scroll from '@components/common/scroll/Scroll'
    import BackTop from '@components/content/BackTop'
    export default {
        name: "Home",
        data(){
          return {
              bannerList: [],
              banner: [],

              recommendList: [],
              recommend: [],

              goods: {
                  'pop': {page: 0, list: []},
                  'new': {page: 0, list: []},
                  'sell': {page: 0, list: []}
              },

              goodsData: 'pop',
              flag: false,
              homeNavTop: 0,

              fixed: false,
              saveY: 0      /*记录离开时的坐标*/
          }
        },
        components: {
            HomeSwiper,
            HomeRecommend,
            HomePopular,
            HomeNav,
            GoodsList,
            Scroll,
            BackTop,
            Navbar
        },
        created() {
            this.getHomeMultidata()
            this.getHomeData('pop');
            this.getHomeData('new');
            this.getHomeData('sell');

        },
        mounted(){
            const refresh = this.debounce(this.$refs.scroll.refresh,200)

            this.$bus.$on('imgLoad',() => {
                refresh()
            })

        },
        methods: {

            goodsImgLoad(){
                this.homeNavTop = this.$refs.homeNav.$el.offsetTop;

            },

            debounce(fn, delay = 300) {   //默认300毫秒     /*防抖函数 避免一时间执行某个函数太多次*/
                let timer;
                return function() {
                    let args = arguments;
                    if(timer) {
                        clearTimeout(timer);
                    }
                    timer = setTimeout(() => {
                        fn.apply(this, args);   // this 指向vue
                    }, delay);
                };
            },


            curindex(k){
                switch (k) {
                    case 0:
                        this.goodsData = 'pop';
                        break;
                    case 1:
                        this.goodsData = 'new';
                        break;
                    case 2:
                        this.goodsData = 'sell';
                        break;
                }
                this.$refs.homeNav.currentIndex = k;
                this.$refs.homeNav1.currentIndex = k;
            },
            backTop(){
                this.$refs.scroll.scrollBackTop(0, 0);  /*回到顶部*/
            },

            bToTop(option){     /*滑动到2000像素显示回到顶部*/
                this.flag = (-option.y) > 2000;
                this.fixed = (-option.y) > this.homeNavTop
                this.saveY = option.y
            },

            pulling(){
                this.getHomeData(this.goodsData);
                this.$refs.scroll.finishPullUp();
            },





            /*以下网络请求方法*/
            getHomeMultidata(){
                getHomeMultidata().then(res => {
                    this.bannerList = res.data.data.banner.list      /*轮播图数据*/
                    this.banner = res.data.data.banner      /*banner数据*/

                    this.recommendList = res.data.data.recommend.list
                    this.recommend = res.data.data.recommend
                });
            },
            getHomeData(type){
                let page = this.goods[type].page += 1
                getHomeData(type, page).then(res => {     /*得到数据*/
                    this.goods[type].list.push(...res.data.data.list)   /*添加数组*/

                })
                this.goods[type].page = page;      /*设置页数*/
            }
        },
        computed: {
            goodsListData(){
                return this.goods[this.goodsData];
            },

        },

        activated() {
            this.$refs.scroll.scrollBackTop(0, this.saveY, 0);
            this.$refs.scroll.refresh();
        }
    }
</script>

<style scoped>
#home {
    position: relative;
    height: 100vh;
}
.scroll {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
}
    .homeNav2 {
        background-color: #fff;
        position: relative;
        z-index: 3;
        top: 44px;
        left: 0;
        right: 0;
    }
.nb-color {
    background-color: #f10;
}
</style>