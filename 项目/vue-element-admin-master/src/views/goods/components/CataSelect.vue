<template>
  <div>
    <el-option v-for="item in cates" :key="item.id" :value="item.cate" :label="item.cate_zh"></el-option>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex"
export default {
  data() {
    return {

    }
  },

  computed: {
    ...mapState("goods", ["cates"]),
  },
  created() {
    this.getCates();
  },
  methods: {
    ...mapActions("goods", ['getCates'])
  },
}
</script>

<style>

</style>