<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <div class="notice" v-show="conversationShow">
          <iframe
            style="border: none"
            :src="src"
            ref="iframe"
            id="iframe"
          ></iframe>
        </div>
        <div v-for="item in talkList" :key="item">
          <div class="TItem">
            <div class="rightItm">
              <div class="RTalk">
                <el-input
                  v-model="inputs[item]"
                  round
                  placeholder="Please input"
                  @input="pass($event)"
                  @keyup.enter="TalkFinish(item)"
                />
              </div>
                <el-icon class="RAIcon"><avatar /></el-icon>
            </div>
          </div>
          <div class="leftItm" v-show="talkStart[item]">
            <div class="leftTalk">
              <div class="LAIcon">
                <el-icon><avatar /></el-icon>
              </div>
              <div class="LTalk">
                <el-input v-model="answerList[item]" disabled round />
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, ref } from "vue";
import system from "../../system";
export default {
  setup() {
    onMounted(() => {
      //加载方法给子类调用
      window.conversation = function (data) {
        return { data };
      };
    });
    //监听输入框
    function pass(event) {
      state.conversationShow = true;
      setTimeout(() => {
        document.getElementById("iframe").contentWindow.afirst(event);
      }, 500);
    }
    const iframe = ref(null);
    const state = reactive({
      inputs: [],
      conversationShow: false,
      src: "../../../jiebaJs/jieba.html",
      talkStart: [false],
      answerList: [],
      talkList: 1,
      answerList: [],
    });
    //传递数据
    function TalkFinish(item) {
      state.conversationShow = false;
      if (state.inputs[item] && !state.talkStart[item]) {
        state.talkStart[item] = true;
        state.talkList++;
      }
      let questionSentnce = document
        .getElementById("iframe")
        .contentWindow.asecond();
      console.log(questionSentnce);
      state.answerList[item] = system.analysis(questionSentnce);
    }
    return {
      ...toRefs(state),
      TalkFinish,
      iframe,
      pass,
    };
  },
};
</script>

<style scoped>
.TItem {
  margin-top: 1vh;
}
.leftItm {
  display: flex;
  flex-direction: row;
  height: 5vh;
}
.LAIcon {
  float: left;
  width: 3vw;
  height: 3vh;
  margin-top: 0.5vh;
  margin-left: 1vw;
}
.LTalk {
  display: inline-block;
  margin-left: 1vw;
}
.rightItm {
  display: flex;
  flex-direction: row;
  margin-right: 2vw;
  height: 5vh;
}
.RTalk {
  margin-left: 2vw;
  float: right;
  margin-left: 48vw;
}
.RAIcon {
  width: 3vw;
  height: 3vh;
  margin-top: 0.5vh;
  margin-left: 2vw;
}

:deep .el-input__inner {
  border-radius: 40px;
  width: 23vw;
}
.notice {
  position: absolute;
  height: 10vw;
  left: 36%;
}
</style>