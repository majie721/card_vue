<template>
    <div class="sell">
        <div>
            <van-nav-bar title="我要卖卡" >
                <span slot="right" class="kefu" >
                <i class="iconfont iconkefu"></i>
                    客服
                </span>
            </van-nav-bar>
        </div>

        <div>
            <van-tabs @click="clickType">
                <van-tab :title="item.name" name="0" v-for="(item,index) in list" :key="index" >
                    <van-card
                            :price="'当前销卡速度:1-2个小时'"
                            :desc="category.desc"
                            :title="category.name"
                            :thumb="category.image|cdn"
                            currency=""
                            v-for="(category,key) in item.categorys"
                            :key="key"
                            @click="cardClick(category)"
                    >
                        <div slot="tags" class="tags">
                            <van-tag plain type="danger" v-if="category.max>0">{{category.max}}折</van-tag>
                        </div>
                    </van-card>

                </van-tab>
            </van-tabs>
            <hr align=center  color=#f7f8fa SIZE=1>
        </div>

        <van-action-sheet :title="title" :description="description" cancel-text="取消" safe-area-inset-bottom v-model="sheetShow" :actions="actions" @select="onSelect" />

        <ATabbar></ATabbar>
    </div>
</template>

<script>
    import { Tab, Tabs , Sidebar, SidebarItem,Card,ActionSheet} from 'vant';

    export default {
        name: "Sell",

        components:{
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,
            [Sidebar.name]:Sidebar,
            [SidebarItem.name]:SidebarItem,
            [Card.name]:Card,
            [ActionSheet .name]:ActionSheet,

        },

        data:function () {
            return {
                active:1,
                activeKey:1,
                list:[],
                sheetShow:false,
                actions:[],
                title:'卡种',
                description:'选择你要提交的卡类型',
            }
        },

        methods: {
            clickType:function(name,title){
                this.activeKey = name
            },
            cardClick:function (category) {
                if(category.products.length==0){
                    this.$toast(`${category.name}维护中,请耐心等待` );
                }else if(category.products.length==1){
                    this.$router.push(`/detail/${category.products[0]['id']}`)
                }else{
                    this.actions = [];
                    for (let product of category.products){
                        let option ={
                            name:product.name,
                            subname:product.max?`${product.max}折`:'高价回收',
                            className:'action-item',
                            data:product
                        };
                        this.actions.push(option)
                    }
                    this.sheetShow = true
                    this.title = category.name
                }
            },
            onSelect:function (item,index) {
                this.$router.push(`/detail/${item.data['id']}`)
            }
        },

        created() {
             this.$api.productData().then(
                res=>{
                   // console.log(res.data);
                    this.list=res.data.data
                }
            )
        }
    }
</script>

<style scoped>
    .line{
        margin: 3px 0;
    }

    .sell{
        height: 100vh;
        background-color: #ffffff;
    }

    .van-sidebar-item{
        background-color: #f7f8fa;
    }

    .tags{
        min-height: 21px;
    }

    .van-action-sheet__subname{
        color: #e54d42;
    }
</style>
