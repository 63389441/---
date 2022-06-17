<template>
    <div class="main">
        <el-carousel :interval="4000" type="card">
            <el-carousel-item v-for="item in imgList" :key="item">
                <h3><img :src="item.src" alt="item.title" ></h3>
            </el-carousel-item>
        </el-carousel>
        <div class="talk">
            <el-container>
                <el-header>请输入专业的行为诊断哦</el-header>
                <el-main>
                    <el-scrollbar height="35vh"
                        >
                            <TalkItem></TalkItem></el-scrollbar>
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import TalkItem from '../components/QuestionItem/TalkItem.vue';
export default {
    components: {
        TalkItem,
    },
    setup() {
        const state = reactive({
            imgList:[
                {
                    title:'0',
                    src: new URL('../assets/imgs/1.jpg', import.meta.url).href,
                },
                {
                    title:'1',
                    src: new URL('../assets/imgs/2.jpg', import.meta.url).href,
                },
                {
                    title:'2',
                    src: new URL('../assets/imgs/3.jpg', import.meta.url).href,
                },
                {
                    title:'3',
                    src: new URL('../assets/imgs/4.jpg', import.meta.url).href,
                },
                {
                    title:'4',
                    src: new URL('../assets/imgs/5.jpg', import.meta.url).href,
                },
                {
                    title:'5',
                    src: new URL('../assets/imgs/6.jpg', import.meta.url).href,
                },
                {
                    title:'6',
                    src: new URL('../assets/imgs/7.jpg', import.meta.url).href,
                },
            ]
        });
        return {
            ...toRefs(state),
        };
    },
};
</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    margin: 0;
    text-align: center;
}
.el-carousel__item img {
    width: auto;
	height: auto;
	max-width: 100%;
	max-height: 100%;
}
.main{
    width: 85vw;
}
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
.talk {
    margin-top: 2vh;
    background-color: rgb(165, 170, 190);
    height: 50vh;
}
</style>