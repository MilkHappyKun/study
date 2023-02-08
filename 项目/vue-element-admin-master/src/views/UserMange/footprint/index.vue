<template>
  <div class="member_manage">
    <memberHeader :first.sync="userId" :second.sync="goodsId" :firstPlaceholder="'请输入用户ID'"
      :secondPlaceholder="'请输入商品ID'" @firstEven="handleFilter" @secondEven="handleDownload"
      :btn2Loading="downloadLoading"></memberHeader>
    <ContentTable :rowArr="showRowArr" :list="list" :listLoading="listLoading" @sortChange="sortChange"></ContentTable>
    <div class="table_stepper">
      <pagination v-show="total > 0" :total="total" :page.sync="userlist.page" :limit.sync="userlist.limit"
        :pageSizes="userlist.pageSizes" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import { getFootprintList } from '@/api/member'
import Pagination from '@/components/Pagination'
import memberHeader from "../component/ListCom_header"
import ContentTable from "../component/ContentTable"
export default {
  name: "MemberManage",
  data() {
    return {
      listLoading: false,// 未获取数据前,显示加载中
      downloadLoading: false,//控制按钮加载中
      list: [],//表格数据
      total: 0,//数据总数
      userId: '',
      goodsId: '',
      userlist: {//过滤栏和分页器栏数据0
        page: 1,//前往第几页
        limit: 5,
        pageSizes: [5, 10, 15, 20],
        order: 'desc',//按id排序,id大的后添加,默认返回顺序视觉效果为倒序,过此处顺倒序反写
      },
      showRowArr: [
        {
          key: 'id',
          title: '足迹ID',
          sortable: 'custom',
          width: '120',
        },
        {
          key: 'userId',
          title: '用户ID',
        },
        {
          key: 'goodsId',
          title: '商品ID',
        },
        {
          key: 'addTime',
          title: '添加时间',
        },
      ]
    }
  },
  components: {
    Pagination,
    memberHeader,
    ContentTable
  },
  beforeMount() {
    this.getList()
  },
  methods: {
    handleDownload() {//导出执行
      this.downloadLoading = true//开启导出按钮的loading状态
    },
    handleFilter() {
      this.userlist.page = 1//改变当前页至第一页
      this.getList()//再次获取列表数据
    },
    getList() {
      this.listLoading = true//数据回来前显示为加载中
      let obj = {
        page: this.userlist.page,
        limit: this.userlist.limit,
        userId: this.userId || null,
        goodsId: this.goodsId || null,
        sort: 'add_time',
        order: this.userlist.order == 'desc' ? 'asc' : 'desc',
      }
      getFootprintList(obj).then(res => {
        res.data.items.forEach(item => {
          item.fullAddress = item.province + item.area + item.city + item.address
          item.isDefault = item.isDefault ? '是' : '否'
        });
        this.list = res.data.items
        this.total = res.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    sortChange(data) {//表格列排序改变触发,参数为一个对象,里面有三个数据:column, prop, order,column是当前列,prop是当前列的prop,order是 排序的规则（升序、降序和默认[默认就是没排序]）
      const { prop, order } = data
      if (prop === 'id') {//如果是id列使表格改变
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending' || order === null) {//如果改变的值是升序排列
        this.userlist.order = 'desc'//
      } else {//降序
        this.userlist.order = 'asc'
      }
      this.handleFilter()
    }
  }
}
</script>

<style lang="less" scoped>
.member_manage {
  padding: 20px;
}
</style>