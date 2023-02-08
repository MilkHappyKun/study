<template>
	<el-upload name="good" class="upload-demo" drag action="/api/v1/element/upload/img" multiple :show-file-list="false"
		:on-success="imgSuccess">
		<template #trigger>
			<div v-if="value">
				<el-image :src="`http://47.94.210.129:9999${value}`"></el-image>
			</div>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		</template>
		<template #tip>
			<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
		</template>
	</el-upload>
</template>

<script>
export default {
	name: "ImgUpload",
	props: {
		value: {
			type: String,
			default: ""
		}
	},
	data() {
		return {

		}
	},
	methods: {
		imgSuccess(res) {
			if (res.data && res.data.img) {
				let img = res.data.img;
				console.log("img:", img);
				this.$emit("input", img)
			}
		}
	}
}
</script>

<style>

</style>