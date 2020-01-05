<template>
    <div>
        <div>
            <van-nav-bar
                    title="常见问题"
                    @click-left="$router.go(-1)"
                    left-arrow
                    class="header-bar"
            >
            </van-nav-bar>

            <van-search
                    v-model="keyword"
                    placeholder="请输入搜索关键词"
                    show-action
                    shape="round"
                    @search="onSearch"
            >
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>

            <van-collapse v-model="activeName">
                <van-collapse-item title="标题1" name="1">内容</van-collapse-item>
                <van-collapse-item title="标题2" name="2">内容</van-collapse-item>
                <van-collapse-item title="标题3" name="3">内容</van-collapse-item>
            </van-collapse>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Questions",
        data:function () {
            return {
                keyword:'',
                activeName:['1']
            }
        },
        methods:{
            onSearch:function () {

            },
            onCancel:function () {

            }
        }
    }
</script>

<style scoped>

</style>
