<template>
  <echarts :mychartdata="mychartdata" />
</template>

<script>
import axios from "axios";
import echarts from '../components/Echarts/Echarts.vue';
import { onMounted, reactive, toRefs} from "vue";
export default {
  name: "total",
  components: {
    echarts,
  },
  setup() {
    const state = reactive({
      mychartdata: [],
      nodes: [],
      links: [],
      height:80,
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
            console.log(res1.data);
            console.log(res2.data);
            for (let i = 0, len = res1.data.length; i < len; i++) {
              var nodestemp = {
                id: res1.data[i].n.properties.id,
                name: res1.data[i].n.properties.name,
              };
              state.nodes.push(nodestemp);
            }
            state.mychartdata.push(state.nodes);
            for (let i = 0, len = res2.data.length; i < len; i++) {
              var linkstemp = {
                source: res2.data[i].p.properties[0].start.properties.id,
                target: res2.data[i].p.properties[0].end.properties.id,
                value: res2.data[i].p.properties[0].relationship.properties.pro,
              };
              state.links.push(linkstemp);
            }
            state.mychartdata.push(state.links,state.height);
          })
        );
    };
    onMounted(() => {
      DataLoad();
    });
    return {
      ...toRefs(state),
      DataLoad,
    };
  },
};
</script>

<style>
</style>