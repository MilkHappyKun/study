<template>
  <div :class="{ 'hidden': hidden }" class="pagination-container">
    <el-pagination :background="background" :current-page.sync="currentPage" :page-size.sync="pageSize" :layout="layout"
      :page-sizes="pageSizes" :total="total" v-bind="$attrs" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: {//总数,仅显示
      required: true,
      type: Number
    },
    page: {//当前第几页
      type: Number,
      default: 1
    },
    limit: {//每页数据限制,未传入默认20
      type: Number,
      default: 20
    },
    pageSizes: {// 每页数据限制下拉框选择,未传入默认[10, 20, 30, 50]
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {//子组件块从左至右布局
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      this.currentPage = 1
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}

.pagination-container.hidden {
  display: none;
}
</style>
