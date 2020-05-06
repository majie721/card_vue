<template>
  <div>
    <van-dialog v-model="show" title="标题" show-cancel-button> </van-dialog>
  </div>
</template>

<script>
export default {
  name: "Protocol",
  data() {
    return {
      show: true
    };
  }
};
</script>

<style scoped></style>
