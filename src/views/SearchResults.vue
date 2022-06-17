<template>
  <el-button
    type="primary"
    round
    color="#626aef"
    style="color: white ; marigin-left: -10vw;"
    @click="DataCheck"
    >{{ checkbutton }}</el-button
  >
  <el-button
    v-show="ButtonShow"
    type="primary"
    round
    color="#626aef"
    style="color: white"
    @click="
      () => {
        EchartsShow = true;
      }
    "
  >
    showpic</el-button
  >
  <p>i am result-Nodes</p>
  <p>您想搜索的数据是{{ NodesSearch }}</p>
  <p v-for="item in DataTemp" :key="item">
    {{ item.target }}-{{ item.relation }}->{{ item.start }}
  </p>
  <div class="eShow" v-if="EchartsShow">
      <echarts :mychartdata="Pdata"></echarts>
  </div>
</template>
<script>
import axios from "axios";
import echarts from '../components/Echarts/Echarts.vue';
import { reactive, toRefs, watchEffect, onMounted } from "vue";
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
        // console.log(rel.target);
        if (state.NodesSearch == rel.start || state.NodesSearch == rel.target) {
          console.log("yes");
          state.DataTemp.push(rel);
          state.PLinks.push(rel.link);
          state.Pdata.push(state.PNodes, state.PLinks,state.height);
        }
        console.log(state.Pdata);
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
    echarts,
  },
  setup(props) {
    const state = reactive({
      Relation: [],
      DataTemp: [],
      count: 0,
      ShowData: [],
      NodesSearch: [props[0]],
      checkbutton: "check",
      PicShow: false,
      ButtonShow: false,
      PNodes: [],
      PLinks: [],
      Pdata: [],
      EchartsShow: false,
      height:38,
    });
    watchEffect((onInvalidate) => {
      console.log(props.searchContent);
      let timer = setTimeout(() => {
        state.NodesSearch = props.searchContent;
      }, 800);
      onInvalidate(() => {
        //初次不会执行，第二次开始就率先执行
        state.checkbutton = "show";
        state.count = 0;
        state.ButtonShow = false;
        state.EchartsShow = false;
        console.log("startfunction");
        clearTimeout(timer);
      });
    });
    const DataLoad = () => {
      axios
        .all([
          axios({
            url: "../data/records.json",
          }),
          axios({
            url: "../data/rel.json",
          }),
        ])
        .then(
          axios.spread((res1, res2) => {
            console.log(res2.data);
            for (let i = 0, len = res1.data.length; i < len; i++) {
              var NodesTemp = {
                id: res1.data[i].n.properties.id,
                name: res1.data[i].n.properties.name,
              };
              state.PNodes.push(NodesTemp);
            }
            for (let i = 0, len = res2.data.length; i < len; i++) {
              var relation = {
                start: res2.data[i].p.properties[0].start.properties.name,
                target: res2.data[i].p.properties[0].end.properties.name,
                relation:
                  res2.data[i].p.properties[0].relationship.properties.pro,
                link: {
                  source: res2.data[i].p.properties[0].start.properties.id,
                  target: res2.data[i].p.properties[0].end.properties.id,
                  value:
                    res2.data[i].p.properties[0].relationship.properties.pro,
                },
              };
              state.Relation.push(relation);
            }
          })
        );
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
  margin-top: 15px;
  margin-left: -1vw;
}
:root {
  --el-color-primary: #409eff;
}
.eShow {
  margin-top: 3vh;
}
</style>