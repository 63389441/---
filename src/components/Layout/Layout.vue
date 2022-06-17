<template>
  <el-container>
    <el-header
      ><el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group></el-header
    >
    <el-container>
      <el-aside :width="isCollapse ? '8vw' : '14vw'"
        ><el-menu
          default-active="/see"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><house /></el-icon>
              <span>问答</span>
            </template>
            <el-menu-item-group>
              <template #title><span>问答系统</span></template>
              <router-link to="/Aquestion">
                <el-menu-item index="/Aquestion">进入系统</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><search /></el-icon>
              <span>搜索</span>
            </template>
            <el-menu-item-group>
              <template #title><span>按条件搜索</span></template>
              <router-link to="/nsearch">
                <el-menu-item index="/nsearch">节点</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
                <el-icon><stopwatch /></el-icon>
              <span>总览</span>
            </template>
            <el-menu-item-group>
              <template #title><span>查看</span></template>
              <router-link to="/total">
                <el-menu-item index="/total">所有关系</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu></el-aside
      >
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<script>
import { toRefs, reactive } from "vue";
export default {
  name: "Layout",
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style>
img {
  vertical-align: middle;
  width: 3vw;
  height: 3vh;
}
.el-header,
.el-footer {
  height: 10vh;
  text-align: center;
  line-height: 60px;
}
.el-container {
  width: 100%;
}
.el-main {
  color: #333;
  width: auto;
  float: right;
  text-align: center;
}
a {
  text-decoration: none;
}
.router-link {
  text-decoration: none;
}
</style>