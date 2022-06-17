<template>
    <div class="buttongroup">
        <el-button
            type="primary"
            round
            color="#626aef"
            style="color: white"
            @click="DataCheck"
            >{{ checkbutton }}</el-button
        >
        <el-button
            v-show="ButtonShow"
            type="primary"
            round
            color="#626aef"
            style="color: white"
            @click="(()=>{state.Picshow=true})"
        >
            showpic</el-button
        >
    </div>
    <p>i am result-Nodes</p>
    <p>您想搜索的数据是{{ NodesSearch }}</p>
    <p>{{ Relation }}</p>
    <p>{{ DataTemp }}</p>
    <p>{{ count }}</p>
    <div v-for="(item, key) in ShowData" :key="key">
        <!-- key-0+1,将字符转换为数字，索引值为0需要+1 -->
        第{{ key - 0 + 1 }} 开始：{{ item.start }} -> 结束：{{
            item.end
        }}
        关系：{{ item.relation }} {{ item.link }}
    </div>
    <div v-show="Picshow">
        <Secharts id="picture" style="width: 80vw; height: 35vh"></Secharts>
    </div>
</template>
<script>
import axios from 'axios';
import Secharts from './Secahrts.vue';
import { ref, reactive, toRefs, watchEffect, onMounted } from 'vue';
function SearchFun(state) {
    const DataCheck = () => {
        if (state.count == 0) {
            state.ShowData.length = 0;
            state.DataTemp.length = 0;
            state.PLinks.length = 0;
        }
        state.count++;
        //forof遍历关系数组
        if (state.count == 1) {
            for (const rel of state.Relation) {
                if (
                    state.NodesSearch == rel.start ||
                    state.NodesSearch == rel.relation
                ) {
                    state.DataTemp.push(rel);
                    state.PLinks.push(rel.link);
                    state.Pdata.push(state.PNodes, state.PLinks);
                }
            }
            state.ShowData = [...state.DataTemp];
            state.ButtonShow = true;
        }
    };
    return {
        DataCheck,
    };
}
export default {
    props: {
        searchContent: String,
    },
    components: {
        Secharts,
    },
    setup(props) {
        const state = reactive({
            Relation: [],
            DataTemp: [],
            count: 0,
            ShowData: [],
            NodesSearch: [props[0]],
            checkbutton: 'check',
            ButtonShow: false,
            PNodes: [],
            PLinks: [],
            Pdata: [],
            picShow:false,
        });
        const pictureDom = ref();
        watchEffect((onInvalidate) => {
            console.log(props.searchContent);
            let timer = setTimeout(() => {
                state.NodesSearch = props.searchContent;
            }, 800);
            onInvalidate(() => {
                //初次不会执行，第二次开始就率先执行
                state.checkbutton = 'show';
                state.count = 0;
                state.ButtonShow = false;
                console.log('startfunction');
                clearTimeout(timer);
            });
        });
        const DataLoad = () => {
            axios.get('../data/data_sum.json').then((Response) => {
                for (let i = 0, len = Response.data.length; i < len; i++) {
                    var relation = {
                        start: Response.data[i].p.segments[0].start.properties
                            .name,
                        end: Response.data[i].p.segments[0].end.properties.name,
                        relation:
                            Response.data[i].p.segments[0].relationship
                                .properties.name,
                        link: {
                            source: Response.data[i].p.segments[0].start
                                .identity,
                            target: Response.data[i].p.segments[0].end.identity,
                            value: Response.data[i].p.segments[0].relationship
                                .properties.name,
                        },
                    };
                    var NodesTemp = {
                        id: Response.data[i].p.start.identity,
                        name: Response.data[i].p.start.properties.name,
                    };
                    state.PNodes.push(NodesTemp);
                    state.Relation.push(relation);
                }
            });
        };
        onMounted(() => {
            DataLoad();
        });
        return {
            ...toRefs(state),
            ...SearchFun(state),
            DataLoad,
        };
    },
};
</script>

<style>
.el-button {
    /* margin-top: 1vh; */
    margin: 2vh;
}
.buttongroup{
    margin: 2vw;
}
:root {
    --el-color-primary: #409eff;
}
</style>