<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        data() {
            return {
                scroll: null,
            }
        },
        props: {
            probeType: {
                type: Number,
                default: 0
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            // console.log(this.$refs.wrapper);
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                pullUpLoad: this.pullUpLoad,    /*上拉加载更多*/
                click: true
            })
            this.scroll.on('scroll', position => {  /*记录坐标 option是坐标值*/
                this.$emit('bTop', position)
                // console.log(position);
            })
            this.scroll.on('pullingUp',() => {  /*上拉加载更多*/
                this.$emit('pulling')
                // console.log('到底了');
            })

        },
        methods: {
            scrollBackTop(x,y,time=500){
                this.scroll && this.scroll.scrollTo(x,y,time);
            },

            finishPullUp(){
                this.scroll && this.scroll.finishPullUp();    /*加载完成*/
            },
            refresh(){
                this.scroll && this.scroll.refresh()
            }

        }
    }
</script>

<style scoped>

</style>