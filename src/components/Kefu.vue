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
                this.$api.customerMessage().then()
            }
        }
    }
</script>

<style scoped>

</style>