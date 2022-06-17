<template>
    <div class="demo-input-suffix">
        <el-row :gutter="20">
            <div class="searchNotice">请输入搜索内容</div>
            <el-input
                v-model="searchContent"
                class="w-50 m-2"
                placeholder="宁可少字不要多字"
                maxlength="15"
                show-word-limit
                type="text"
                clearable
                @blur="searchGo"
            >
                <template #prefix>
                    <el-icon class="el-input__icon"><search /></el-icon>
                </template>
            </el-input>
        </el-row>
        <Sresult :searchContent="searchContent"></Sresult>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { ElNotification } from 'element-plus';
import Sresult from '../views/SearchResults.vue'
function NodesSearch(state) {
    const searchGo = (event) => {
        if (event.target.value == '') {
            ElNotification({
                title: 'Error',
                message: '请不要输入空值',
                type: 'error',
            });
        }
        state.searchContent = event.target.value.replace(/\s+/g, '');
        if (state.searchContent.length != event.target.value.length) {
            ElNotification({
                title: 'Success',
                message: '已为您去掉空格以及特殊字符',
                type: 'success',
            });
        } else {
            ElNotification({
                title: 'Success',
                message: '请点击按钮查看内容',
                type: 'success',
            });
        }
        // console.log(state.searchContent);
    };
    return {
        searchGo,
    };
}
export default {
    components: {
        Sresult,
    },
    setup() {
        const state = reactive({
            searchContent: '',
        });
        return {
            ...toRefs(state),
            ...NodesSearch(state),
        };
    },
};
</script>

<style>
.searchNotice {
    font-size: large;
    margin-bottom: 2vh;
    margin-left: -3vw;
    text-align: center;
}
.el-row {
    position: relative;
    display: block;
}
.el-input {
    width: 45vw;
}
</style>