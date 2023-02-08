<template>
  <div class="member_list_table">
    <!-- border 是否含有纵向边框 fit 列宽是否自撑开 highlight-current-row 高亮当前选中行-->
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row @sort-change="sortChange">
      <el-table-column v-for="(item, index) of rowArr" :label="item.title" prop="id" :sortable="item.sortable"
        align="center" :width="item.width" :key="index">
        <template slot-scope="{row}">
          <img :src="row[item.key][0]" v-if="item.type == 'img'" style="width:100%" />
          <span class="test" v-else-if="!item.tag">{{ row[item.key] }}</span>
          <div v-else-if="item.key == 'gender'">
            <el-tag :type="row[item.key] === 1 ? '' : 'danger'" v-if="row.gender">{{
              row[item.key] === 1 ? item.trueText : item.falseText
            }}</el-tag>
            <el-tag v-else>未知</el-tag>
          </div>
          <el-tag v-else :type="row[item.key] ? item.trueText : item.falseText">{{
            row[item.key]? item.trueText : item.falseText
          }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    listLoading: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: []
    },
    rowArr: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
    }
  },
  methods: {
    // 生日数据处理
    birthdayDispose(str) {
      console.log(str);
      if (!str) return '未填写';
      let newArr = str.split('-').filter((item, index) => index >= 1)
      return newArr[0] + '月' + newArr[1] + '日'
    },
    sortChange(data) {
      this.$emit('sortChange', data)
    }
  }
}
</script>

<style lang="less" scoped>
.test {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>