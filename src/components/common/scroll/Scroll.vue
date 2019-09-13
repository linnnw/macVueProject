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
            }
        },
        mounted() {
            // console.log(this.$refs.wrapper);
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                pullUpLoad: true,
                click: true
            })
            this.scroll.on('scroll', position => {
                this.$emit('bTop', position)
                // console.log(position);
            })
            this.scroll.on('pullingUp',() => {
                console.log('到底了');
                setTimeout(() => {
                    this.scroll.finishPullUp();    /*加载完成*/
                },2000)
            })

        },
        methods: {
            scrollBackTop(x,y,time=500){
                this.scroll.scrollTo(x,y,time);
            }

        }
    }
</script>

<style scoped>

</style>