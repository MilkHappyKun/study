<template>
  <div class="member_header">
    <el-input v-model="firstValue" :placeholder="firstPlaceholder" style="width: 200px;" class="filter_item"
      @keyup.enter.native="handleBtn1" />
    <el-input v-model="secondValue" :placeholder="secondPlaceholder" style="width: 200px;" class="filter_item"
      @keyup.enter.native="handleBtn1" />
    <el-button v-waves class="filter_item filter_item_button" :type="firstBtnType" :icon="firstIcon"
      @click="handleBtn1">
      {{ btn1Title }}
    </el-button>
    <el-button v-waves :loading="btn2Loading" class="filter_item filter_item_button" :type="secondBtnType"
      :icon="secondIcon" @click="handleBtn2">
      {{ btn2Title }}
    </el-button>
  </div>
</template>

<script>
export default {
  props: {
    btn1Title: {
      type: String,
      default: '查找'
    },
    btn2Title: {
      type: String,
      default: '导出'
    },
    first: {
      type: [String, Number],
      required: true
    },
    second: {
      type: [String, Number],
      required: true
    },
    firstPlaceholder: String,
    secondPlaceholder: String,
    btn2Loading: {
      type: Boolean,
      default: false
    },
    firstIcon: {
      type: String,
      default: "el-icon-search"
    },
    secondIcon: {
      type: String,
      default: "el-icon-download"
    },
    firstBtnType: {
      type: String,
      default: "primary"
    },
    secondBtnType: {
      type: String,
      default: "primary"
    }
  },
  computed: {
    firstValue: {
      get() { return this.first },
      set(val) {
        this.$emit('update:first', val)
      }
    },
    secondValue: {
      get() { return this.second },
      set(val) { this.$emit('update:second', val) },
    }
  },
  methods: {
    handleBtn1() {
      this.$emit('firstEven')
    },
    handleBtn2() {
      this.$emit('secondEven')
    }
  }
}
</script>

<style lang="less" scoped>
.member_header {
  margin-bottom: 20px;
}

.filter_item {
  margin-right: 5px;

  &.filter_item_button {
    background-color: #409eff;
  }
}
</style>