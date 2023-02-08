<template>
	<div class="good_add_form">
		<!-- 添加网页表头 -->
		<el-page-header @back="$router.back()" content="新增商品">
			<template #content>
				<span class="text-large font-600 mr-3 text_header"> {{ `商品${id ? '编辑' : '新增'}` }} </span>
			</template>
		</el-page-header>

		<!-- 添加商品表单 -->
		<el-form ref="addCommodityForm" :model="addCommodityForm" label-width="80px" style="width:600px;" :rules="rules">
			<!-- 商品名称 -->
			<el-form-item label="商品名称" prop="name">
				<el-input v-model="addCommodityForm.name"></el-input>
			</el-form-item>
			<!-- 商品描述 -->
			<el-form-item label="商品描述" prop="desc">
				<el-input type="texterea" rows="3" v-model="addCommodityForm.desc"></el-input>
			</el-form-item>
			<!-- 商品分类 -->
			<el-form-item label="商品分类" prop="cate">
				<el-select v-model="addCommodityForm.cate" placeholder="请选择">
					<CateSelect></CateSelect>
				</el-select>
			</el-form-item>
			<!-- 商品价格 -->
			<el-form-item label="商品价格" prop="price">
				<el-input-number v-model="addCommodityForm.price" :min="0">
				</el-input-number>
			</el-form-item>
			<!-- 是否热销 -->
			<el-form-item label="是否热销" prop="hot">
				<el-switch v-model="addCommodityForm.hot"></el-switch>
			</el-form-item>
			<!-- 商品图片(上传) -->
			<el-form-item label="商品图片" prop="img">
				<!-- action 就是图片上传的接口 -->
				<ImgUpload v-model="addCommodityForm.img"></ImgUpload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onsubmit()">提交</el-button>
				<el-button @click="resetForm()">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import CateSelect from './components/CataSelect'
import ImgUpload from './components/ImgUpload'
import { submitGood, getGoodInfo } from '@/api/goods'
export default {
	components: {
		CateSelect,
		ImgUpload
	},
	props: ["id"],
	data() {
		return {
			addCommodityForm: {
				name: '',
				desc: '',
				cate: '',
				price: 0,
				hot: 0,
				img: ""
			},
			rules: {
				name: [
					{ required: true, message: '请输入商品名称', trigger: 'blur' },
					{
						pattern: /[\u4e00-\u9fa5]/,
						message: '商品名称要求4~8个中文汉字',
						trigger: 'blur'
					}
				],
				desc: [
					{ require: true, message: '请填写商品介绍', trigger: 'blur' },
					{
						min: 0,
						max: 30,
						message: "商品名称要求20~30个字符",
						trigger: "blur",
					},
				],
				cate: [
					{ required: true, message: "请选择商品品类", trigger: "change" },
				],
				price: [
					{ required: true, message: "请填写商品价格", trigger: "change" },
				],
				img: [{ required: true, message: "请上传商品图片", trigger: "change" }],
			}
		}
	},
	methods: {
		onsubmit() {
			this.$refs['addCommodityForm'].validate((valid) => {
				if (valid) {
					let data = { ...this.addCommodityForm };
					submitGood(data).then((res) => {
						if (res.data && res.data.info) {
							this.$message({
								message: '商品增加成功',
								type: "success",
								duration: 1500,
								onClose: () => {
									this.$router.back()
								}
							})
						}
					})
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		resetForm() {
			this.$refs['addCommodityForm'].resetFields();
		}
	},
	mounted() {
		getGoodInfo(this.id).then((res) => {
			if (res.data && res.data.info) {
				const info = res.data.info;
				this.addCommodityForm = info
			}
		})
	}
}
</script>

<style lang="less">
.good_add_form {
	padding: 10px;

	.text_header {
		font-size: 24px;
	}
}
</style>