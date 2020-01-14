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
                <van-collapse-item v-for="(item,key) in list" :title="item.title" :key="key" :name="key">
                    <div v-html="item.content"></div>
                </van-collapse-item>
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
                activeName:['0'],
                list:[]
            }
        },
        methods:{
            onSearch:function () {
                this.getQuestions()
            },
            onCancel:function () {
                this.keyword=''
            },
            getQuestions:function () {
                this.$api.getQuestions(this.keyword).then(
                    res=>{
                        this.list=res.data.data
                })
            }
        },
        created() {
            this.getQuestions();
        }
    }
</script>

<style scoped>

</style>
