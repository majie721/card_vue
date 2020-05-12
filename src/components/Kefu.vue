<template>
    <div>
        <i @click="sendMsg()" class="iconfont iconkefu"></i>
    </div>
</template>

<script>
    export default {
        name: "kefu",
        methods: {
            sendMsg:function () {
               //alert(1111)
               window.location.href="http://wpa.qq.com/msgrd?v=3&uin=1440413448&site=qq&menu=yes"
            }
        }
    }
</script>

<style scoped>

</style>