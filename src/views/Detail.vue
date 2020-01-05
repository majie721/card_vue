<template>
    <div>
        <div>
            <van-nav-bar :title="'回收'"
                         left-arrow
                         left-text="返回"
                         @click-left="$router.go(-1)">
                <span slot="right" class="kefu" >
                <i class="iconfont iconkefu"></i>
                    客服
                </span>
            </van-nav-bar>
        </div>

        <div class="detail-info" >
            <van-cell-group>
                <van-cell title="运营商" :value="info.category.name" is-link @click="popupShowHandle(true)" />
                <van-cell title="卡券类型" :value="info.name" @click="popupShowHandle(true)"  is-link/>
                <van-cell title="面值"  @click="faceShow" is-link >
                    <span v-if="faceSelected.id !=undefined">
                        <van-tag type="danger" plain  size="medium">{{faceVal(faceSelected.value,faceSelected.is_custom)}}</van-tag>
                        <van-tag type="danger" plain  size="medium">{{faceDiscount(faceSelected.discount[0]['discount'])}}折</van-tag>
                    </span>
                    <span v-else>
                        请选择面值
                    </span>
                </van-cell>
            </van-cell-group>
        </div>


        <div class="detail-info" >
            <van-tabs v-model="commitType" >
                <van-tab title="单卡提交" name="single">
                    <van-cell-group>
                        <van-field
                                v-if="info.attributes.card_number_preg !=undefined"
                                preg="info.attributes.card_number_preg.pivot.value"
                                v-model="card_no"
                                required
                                clearable
                                label="卡号"
                                placeholder="请输入卡号"
                                :error-message="card_no_error"
                        />

                        <van-field
                                v-if="info.attributes.card_pwd_preg !=undefined"
                                preg="info.attributes.card_pwd_preg.pivot.value"
                                v-model="card_pwd"
                                label="卡密"
                                placeholder="请输入卡密"
                                :error-message="card_pwd_error"
                                required
                        />
                    </van-cell-group>
                </van-tab>
                <van-tab title="批量提交" name="batch">
                    <van-cell-group>
                        <van-field
                                v-model="card_str"
                                rows="3"
                                autosize
                                type="textarea"
                                placeholder="每张卡密为一行,卡号与密码之间用空格隔开"
                        />
                        <div class="batch-div">
                            <van-button @click="dealContent" type="primary" size="mini" round class="deal-btn">整理卡密</van-button>
                            <span class="batch-span">已输入 <span style="color:#e54d42;font-weight:600">{{nLine}}</span> 张,最多输入200张</span>
                        </div>
                    </van-cell-group>

                </van-tab>
                <div class="batch-div urgent">
                    <van-checkbox v-model="urgent">
                        加急处理
                        <span class="urgent-fee">手续费3%</span>
                    </van-checkbox>

                </div>
            </van-tabs>
        </div>

        <div class="detail-info tips">
            <p style="padding: 0px 20px"> 2019年5月21日 - 这篇文章主要介绍了vue
                1.中使用 watch 出现了如下的报错信息的原因分
                2.析及解决方法,本文附有代码解决方案,非常不错,需要的朋友可以参
                3.析及解决方法,本文附有代码解决方案,非常不错,需
                4.析及解决方法,本文附有代码解决方案,非常不错,需
                5.析及解决方法,本文附有代码解决方案,非常不错,需
            </p>

        </div>

        <div class=" submit-btn">
            <van-button  size="large" type="info" round>提交卡号卡密</van-button>
        </div>


        <van-action-sheet
                safe-area-inset-bottom
                v-model="show"
                title="选择面值"
                cancel-text="取消"
                description="如果您需要提交多种面值的卡券,请按面值分次提交!!!">
           <div>

               <van-grid :gutter="10"
                         :column-num="3"
                         :clickable="true"
                         >

                   <van-grid-item v-for="(face,key) in info.faces" :key="key" @click="onFaceSelect(face)"  :class="face.id==faceSelected.id?'face-selected':''">
                       <div class="face-title">{{faceVal(face.value,face.is_custom)}}</div>
                       <div class="face-discount">{{faceDiscount(face.discount[0]['discount'])}}折</div>
                       <div class="face-sold">{{soldAmount(face.value,face.discount[0]['discount'],face.is_custom)}}</div>
                   </van-grid-item>


               </van-grid>
           </div>
        </van-action-sheet>

        <van-popup
                v-model="popupShow"
                position="right"
                :round="true"
                class="popupStyle"
        >

            <van-index-bar class="index-bar">
                <div v-for="(item,cname) in list" :key="cname">
                    <van-index-anchor :class="info.cid==item['0']['c_id']?'index-selected':''" :index="indexChar(item)">{{cname}}</van-index-anchor>
                    <van-cell :class="info.id==product.id?'index-selected':''" :title="product.name" v-for="(product,index) in item" :key="index" @click="onProductSelect(product)" />
                </div>
            </van-index-bar>
        </van-popup>
    </div>
</template>

<script>
    import {  Grid, GridItem,ActionSheet,Cell, CellGroup,Popup ,IndexBar, IndexAnchor,Tab, Tabs} from 'vant';
    export default {
        name:"Detail",

        components:{
            [Grid.name]:Grid,
            [GridItem.name]:GridItem,
            [ActionSheet.name]:ActionSheet,
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            [Popup.name]:Popup,
            [IndexBar.name]:IndexBar,
            [IndexAnchor.name]:IndexAnchor,
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,
        },

        data:function(){
            return {
                show: false,
                info: {
                    attributes: {},
                    category:{},
                    faces:{},


                },
                productId:0,
                faceSelected:{},
                popupShow:false,
                list:[],
                commitType:'single',
                card_no:'',
                card_pwd:'',
                card_no_error:"",
                card_pwd_error:"",
                card_str:'',
                urgent:false
            }
        },

        methods:{
            faceShow:function(){
                this.show=true
            },
            getProductInfo(){
                this.$api.productInfo(this.$route.params.id).then(res=>{
                    console.log(res);
                    this.info = res.data.data;
                })
            },
            onFaceSelect(val){
                console.log(val);
                this.faceSelected = val
                this.show = false
            },
            productList(){
                this.$api.productList().then(res=>{
                    this.list = res.data.data
                    console.log(this.list);
                })
            },
            onProductSelect(item){
                this.$router.push(`/detail/${item.id}`)
                window.location.reload()
            },
            popupShowHandle(state){
                this.popupShow = state
            },
            dealContent(){
                let str = this.card_str,strArr=[],newArr=[];

                if(str.trim() ==''){
                    this.card_str = ''
                }else{
                    strArr = str.split("\n");
                    let len = strArr.length;
                    for(let i=0;i<len;i++){
                        let info =''
                        if(strArr[i].trim().length>0){
                            info = strArr[i].trim().replace(/\s+/g,' ').split(' ')
                        }else{
                            continue;
                        }
                        console.log(strArr[i],info);
                        if(info.length == 0){
                           continue;
                       }else if(info.length ==1){ //只有卡密
                           let card_pwd = info[0].trim()
                           newArr.push(`${card_pwd}`)
                       }else{ //卡号卡密
                           let card_no = info[0].trim()
                           let card_pwd = info[1].trim()
                           newArr.push(`${card_no} ${card_pwd}`)
                       }
                    }

                    console.log(newArr);
                    if(newArr.length<1){
                        this.card_str=''
                    }else {
                        this.card_str = newArr.join("\n")
                    }
                }
            }
        },

        computed:{
            soldAmount() {
                return function (face,discount,is_custom) {
                    if(is_custom==0 && face && discount){
                        return '可卖'+parseFloat(Math.round(face*discount*100/100)/100) +"元"
                    }else{
                        return ''
                    }
                }
            },
            faceVal(){
              return function (face,is_custom) {
                if(is_custom){
                    return face;
                }else{
                    return parseFloat(face)+"元"
                }
              }
            },
            faceDiscount(){
                return function (val) {
                    return parseFloat(val)
                }
            },
            indexChar(){
                return function (val) {
                    return val[0]['c_code'].substr(0,1)
                }
            },
            nLine(){
                let str = this.card_str
                if(str){
                    return str.split("\n").length;
                }else{
                    return 0;
                }

            }

        },

        created() {
            this.productId =  this.$route.params.id
            this.getProductInfo();
            this.productList();
        }
    }
</script>

<style scoped>
    .van-action-sheet__description{
        color: #f37b1d;
    }

    .face-title{
        font-size: 16px;
        font-weight: 700;
    }

    .face-discount{
        margin: 5px;
        font-size: 14px;
        font-weight: 500;
        color: #e54d42;
    }

    .face-sold{
        font-size: 12px;
        font-weight: 400;
        color: #8799a3;
    }
    .detail-info{
        width: 98%;
        margin: 10px auto;
        border-radius: 12px;
        background-color:#ffffff;
        /*border: 1px solid #8799a3;*/
        overflow: hidden;
    }

    .face-selected  >>> .van-grid-item__content{
        border: 2px solid #f37b1d;
    }

    .popupStyle{
        height: 100%;
        width:80%;
        /*border-radius:12px 0 0 12px;*/
        background-color: #f7f8fa;
    }

    .index-selected{
        color: #f37b1d;
        font-weight: 600;
    }


    .index-selected >>> .van-index-anchor{
        color: #f37b1d !important;
        font-weight: 600;
    }

    .index-bar >>> .van-cell__title{
        padding-left: 30px;
    }

   .detail-info  .van-cell__value{
       flex-grow: 2;
   }

    .deal-btn{
        padding:0 10px;
        background-color: #0081ff;
        border-color: #0081ff
    }

    .batch-div{
        min-height:40px;
        line-height: 40px;
        margin-left: 20px;
        position: relative;
    }
    .batch-div >>> .van-checkbox__label{
        line-height: 40px;
    }

    .urgent{
        font-size: 14px;
        font-weight: 600;
        position: relative;
    }

    .urgent-fee{
        color: #e54d42;
        position: absolute;
        right: 20px;
    }

    .batch-span{
        font-size: 12px;
        position: absolute;
        right: 20px;
    }

    .tips{
        color: red;
        font-size: 12px;
    }

    .submit-btn{
        width: 90%;
        margin: 20px auto;
        height: 30px;
        line-height: 30px;
    }

    .submit-btn >>> .van-button{
        height: 45px;
        line-height: 45px;
    }
</style>
