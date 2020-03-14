<template>
    <div>
        <van-dialog v-model="show"
                    title="请确认以下协议再提交"
                    @cancel="closeHandle"
                    @close="closeHandle"
                    class="mb"
                    @confirm="onConfirm"
                    :confirm-button-color="comfirmStatusColor"
                    :show-confirm-button = 'false'
                    :show-cancel-button="false">
            <div>
                <van-checkbox-group v-model="result">
                    <div class="content">

                        <div>
                            <van-row type="flex" justify="center">
                                <van-col span="3">
                                    <van-checkbox  name="A"></van-checkbox>
                                </van-col>
                                <van-col span="19" class="a-text">我已阅读，理解并接受 <span @click="showProtol" class="x-text">「销卡大师卡密转让协议」</span>和
                                    <span @click="showInstructions" class="x-text">「销卡大师卡密回收说明」</span></van-col>
                            </van-row>
                        </div>
                        <div style="margin-top: 10px">
                            <van-row type="flex" justify="center">
                                <van-col span="3">
                                    <van-checkbox name="B"></van-checkbox>
                                </van-col>
                                <van-col span="19" class="a-text">我已确认该卡号卡密<span class="w-text">来源合法</span>，如有问题，本人愿意承担一切法律责任
                                </van-col>
                            </van-row>
                        </div>
                    </div>
                </van-checkbox-group>

            </div>

            <div class="van-hairline--top van-dialog__footer van-dialog__footer--buttons">
                <button @click="closeHandle" class="van-button van-button--default van-button--large van-dialog__cancel">
                    <span class="van-button__text">取消</span></button>
                <button
                        class="van-button van-button--default van-button--large van-dialog__confirm van-hairline--left"
                        :style="{color: comfirmStatusColor}" :disabled="!comfirmStatus"
                        @click="onConfirm"
                >
                    <span class="van-button__text">确认</span>
                </button></div>
        </van-dialog>
    </div>
</template>

<script>
    export default {
        name: "Agreement",
        props: {
            agreementShow: {
                type: Boolean,
                default: false,
            },
            afterAgreement:{
                type:Function,
                default: null,
            }
        },
        data: function () {
            return {
                result: []
                //show:this.agreementShow
            }
        },
        methods: {
            closeHandle: function () {
                this.$emit('update:agreementShow', false)
                this.$emit("noAgreement")
            },
            onConfirm:function () {
                if(this.result.length===2){
                    this.$emit('update:agreementShow', false)
                    if(this.afterAgreement){
                        this.afterAgreement();
                    }
                }
            },
            showProtol:function () {
                this.$dialog.alert({
                    title: '销卡大师卡密转让协议',
                    message: '销卡大师卡密转让协议（以下称“本协议”）是销卡大师平台（以下称“销卡大师”）与销卡大师用户（以下称“用户”或“您”）就礼品卡或者卡密转让服务（或称”本服务”）所订立的有效合约。用户通过网络页面点击确认或以其他方式选择接受本协议，即表示用户与本平台已达成协议并同意接受本协议的全部约定内容。\n' +
                        '\n' +
                        '在接受本协议之前，请用户仔细阅读本协议的全部内容（特别是以粗体下划线标注的内容）。如果您不同意本协议的任意内容，或者无法准确理解本平台对条款的解释，请不要进行后续操作。\n' +
                        '\n' +
                        '第一条：相关定义\n' +
                        '1.礼品卡：本协议所称礼品卡，是指电子商务卡、商城超市卡、游戏充值卡、话费充值卡、旅游预付卡、石油预付充值卡等业务运营商发行的具有一定面值、可用于购买商品或服务的卡片；\n' +
                        '2.礼品卡转让：本协议所称礼品卡转让，是指本平台提供的礼品卡转让服务。用户可将其持有的礼品卡，转让给本平台或本平台合作商户，转让所得的金额将直接转入用户的账户余额中。具体支持的礼品卡卡种或卡密以用户使用本服务时的页面提示为准。\n' +
                        '第二条：费用\n' +
                        '1.用户使用本服务需要支付一定的手续费，手续费已包含在礼品卡的回收价中；\n' +
                        '2.如果用户选项加急服务，另需支付加急的费用，具体费用由卡卡礼品网提交礼品卡的页面提示为准，加急服务费将直接从到账金额中扣除。\n' +
                        '第三条：权利义务\n' +
                        '1.使用本服务的用户，需符卡卡礼品网用户实名制度（验证本人手机号码，并上传身份证正反面与手持身份证正面自拍照或完成支付宝芝麻信用授权认证）；\n' +
                        '2.用户需按照页面提示选择正确的礼品卡面值。如有面值错误余额恕不退还，损失自行承担！\n' +
                        '3.如因礼品卡卡号、卡密不正确或转让前已经使用等原因，导致礼品卡不能转让的，用户需自行解决或联系发卡业务运营商解决，本平台不介入处理；\n' +
                        '4.本平台应按照本协议的约定及页面提示，向用户提供礼品卡转让服务，并保证用户成功转让的资金及时转入其卡卡礼品网账户；\n' +
                        '5.鉴于互联网及网络交易的特殊性，本平台无法鉴别和判断虚拟交易或正在交易或已交易的礼品卡来源、权属、真伪、等权力属性、自然属性及其他各状况。因此，用户在交易前应加以仔细辨明，并慎重考虑和评估交易可能产生的各项风险。基于此，用户承诺，用户在本平台所从事的礼品卡交易活动属于合法的，用户所提供的礼品卡均具有合法正当的来源；\n' +
                        '6.经国家生效法律文书或行政处罚决定确认用户存在违法行为，或者本平台有足够事实依据可以认定用户存在违法或违反服务协议行为的，本平台有权选择下列一种或多种处理措施进行处理：\n' +
                        'a.中止或终止用户网上交易权限；\n' +
                        'b.注销或删除用户帐户；\n' +
                        'c.在本平台公告上公布用户的违法行为；\n' +
                        'd.保留相应的交易记录提交公安机关处理。\n' +
                        '第四条：其他\n' +
                        '1.本协议适用中华人民共和国大陆地区法律。因本平台与用户就本协议的签订、履行或解释发生争议，双方应努力友好协商解决。如协商不成，本平台和用户同意由广州渔人信息技术有限公司所在地法院管辖审理双方的纠纷或争议；\n' +
                        '2.本协议内容包括协议正文及所有本平台已经发布的或将来可能发布的服务协议、隐私政策、交易规则等条款与本协议具有同等效力，您均应遵照执行；\n' +
                        '3.本协议未尽事宜，以卡卡礼品网网站上公布的《销卡大师礼品卡或卡密转让服务协议》等相关规则为准。'
                })
            },
            showInstructions(){
                this.$dialog.alert({
                    title:'销卡大师卡密回收说明',
                    message:'1、礼品卡回收成功后，金额将打入您的账户余额中，您需要通过实名认证之后才可提现；\n' +
                        '\n' +
                        '2、当选择的面值与实际面值不一致时，您将损失差额，而且会造成延迟到账，请正确选择；\n' +
                        '\n' +
                        '3、转让成功前请不要丢弃实体卡；\n' +
                        '\n' +
                        '4、您的账号因自身原因礼品卡被盗取或封存导致不能审核的责任由您自己承担，我们将直接撤单；\n' +
                        '\n' +
                        '5、若您重复提交同一卡号或故意提交错误信息的，我们会取消交易，并冻结您的账户信息；\n' +
                        '\n' +
                        '6、如果您私下将礼品卡信息交易给其他买家，并再次出售给本网站，造成的损失由您承担，我们将对您的账户信息进行冻结处理；\n' +
                        '\n' +
                        '7、礼品卡交易在未给您打款期间出现问题的话，您应积极配合解决问题，根据要求我们将延迟打款，如果问题没有解决我们将按责任轻重来加以处理；\n' +
                        '\n'
                })
            }
        },
        computed: {
            show: {
                get() {
                    return this.agreementShow
                },
                set(val) {
                    console.log(val)

                }
            },
            comfirmStatusColor:function () {
                if(this.result.length===2){
                     return "#1989fa"
                }else{
                    return "#dddddd"
                }
            },
            comfirmStatus:function () {
                if(this.result.length===2){
                    return true
                }else{
                    return false
                }
            },

        }
    }
</script>

<style scoped>
    .a-text >>> {
        font-size: 12px;
        text-align: center;
    }

    .w-text >>> {
        color: red;
        font-weight: bolder;
    }

    .x-text >>> {
        color: #0081ff;
    }

    .content {
        margin: 8px 5px;
    }


</style>