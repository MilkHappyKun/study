<template>
	<div class="table_box">
		<!-- 筛选区域 -->
		<div class="filter-container">
			<!-- 筛选项 -->
			<el-input placeholder="商品名称" v-model="goodsSearch.name" style="width: 200px" class="filter_item" clearable>
			</el-input>
			<div style="display: inline-block" class="price_interval">
				价格区间
				<el-input-number v-model="goodsSearch.min_price" style="width: 50px" :controls="false" class="filter_item">
				</el-input-number>
				-
				<el-input-number v-model="goodsSearch.max_price" style="width: 50px" :controls="false" class="filter_item">
				</el-input-number>
			</div>
			<el-select v-model="goodsSearch.cate" placeholder="品类" style="width: 200px" class="filter_item" clearable>
				<CateSelect></CateSelect>
			</el-select>
			<el-select v-model="goodsSearch.order" placeholder="请选择" style="width: 200px" class="filter_item">
				<el-option v-for="item in order" :key="item" :value="item"> </el-option>
			</el-select>
			<!-- 按钮区域 -->
			<el-button type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
			<el-button type="primary" icon="el-icon-edit" @click="clickAdd">添加</el-button>
			<el-button type="primary" icon="el-icon-download">导出</el-button>
			<el-checkbox style="margin-left: 20px">审核人</el-checkbox>
		</div>
		<!-- 商品列表区域 -->
		<el-table :data="list" border style="width: 100%">
			<!-- 序号 -->
			<el-table-column prop="id" label="序号" sortable width="180" align="center">
				<template slot-scope="{ $index }">
					<div>{{ $index + 1 }}</div>
				</template>
			</el-table-column>
			<!-- 商品 -->
			<el-table-column prop="name" label="商品" width="180" align="center">
				<template slot-scope="{ row }">
					<img :src="`http://47.94.210.129:9999${row.img}`" alt="" style="width: 60px" mode="widthfix" />
					<div>{{ row.name }}</div>
				</template>
			</el-table-column>
			<!-- 价格 -->
			<el-table-column prop="price" label="价格" width="180" align="center">
				<template slot-scope="{ row }">
					<div>{{ `￥ ${row.price.toFixed(2)}` }}</div>
				</template>
			</el-table-column>
			<!-- 品类 -->
			<el-table-column prop="cate" label="品类" width="180" align="center">
				<template slot-scope="{ row }">
					<div>{{ getCateZH(row.cate) }}</div>
				</template>
			</el-table-column>
			<!-- 是否热销 -->
			<el-table-column prop="hot" label="热销" width="180" align="center">
				<template slot-scope="{ row }">
					<div>{{ row.hot ? "是" : "否" }}</div>
				</template>
			</el-table-column>
			<!-- 发布时间 -->
			<el-table-column prop="create_time" label="发布时间" width="180" align="center">
				<template slot-scope="{ row }">
					<div>{{ row.create_time | time }}</div>
				</template>
			</el-table-column>
			<!-- 商品状态 -->
			<el-table-column prop="state" label="商品状态" width="180" align="center">
				<template slot-scope="{ row }">
					<div>{{ row.state ? "已上架" : "待审核" }}</div>
				</template>
			</el-table-column>
			<!-- 操作 -->
			<el-table-column label="操作" align="center">
				<template slot-scope="{ row }">
					<el-button type="primary" size="mini" @click="toEdit(row)">编辑</el-button>
					<el-button v-if="row.state" type="primary" size="mini">详情</el-button>
					<el-button v-else type="success" size="mini">审核</el-button>
					<el-button size="mini" type="danger" @click="deleteGood(row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分数区域 -->
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
			:page-sizes="[2, 10, 15, 20]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
	</div>
</template>

<script>
import CateSelect from './components/CataSelect'
import { getGoodList, goodDel } from '@/api/goods';
import moment from 'moment';
import { mapState } from "vuex"
export default {
	components: {
		CateSelect,
	},
	filters: {
		time(value) {
			return moment(value).format("MM月DD日 HH:mm")
		}
	},
	data() {
		return {
			goodsSearch: {
				name: "",
				min_price: 0,
				max_price: 0,
				cate: "",
				order: "asc", //'desc' or 'asc'
			},
			order: ["asc", "desc"],

			list: [],
			page: 1,
			size: 10,
			total: 0,
		};
	},
	computed: {
		...mapState("goods", ["cates"])
	},
	mounted() {
		this.getList();
	},

	methods: {
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		clickAdd() {
			this.$router.push({ name: 'addGoods' })
		},
		getList() {
			let params = {
				cate: this.goodsSearch.cate,
				size: this.size,
				page: this.page,
				name: this.goodsSearch.name,
			}
			getGoodList(params).then((res) => {
				if (res.data && res.data.list) {
					this.list = res.data.list;
					this.total = res.data.total;
				}
			})
		},
		getCateZH(cate) {
			let res = this.cates.filter((item) => item.cate === cate);
			if (res.length === 1) {
				return res[0].cate_zh;
			} else {
				return "数据有误,请联系管理员";
			}
		},
		searchClick() {
			this.getList();
		},
		toEdit(row) {
			console.log(row._id);
			this.$router.push("/goods/edit/" + row._id)
		},
		deleteGood(row) {
			this.$confirm(`你确定要删除${row.name}这条商品吗?`, "警告", {}).then(() => {
				const ids = row._id;
				goodDel(ids).then((res) => {
					if (res.data) {
						this.count++;
					}
				});
				this.getList();
			}).catch(() => { console.log("取消") })
		}
	},
};
</script>

<style lang="less">
.table_box {
	margin-top: 30px;
	padding: 0 10px;
}

.price_interval {
	margin: 0 20px 0 10px;
	vertical-align: center;

	.filter_item {
		margin-right: 10px;
		margin-left: 10px;
	}
}

.filter_item {
	margin-right: 10px;
}
</style>