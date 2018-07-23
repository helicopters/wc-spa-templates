<style lang="less" scoped>
</style>
<template>
	<div class="form-container">
		<cms-form v-model="form" ref="form">
			<el-button type="primary" @click="save">
				{{$route.query.isEdit ? '保存编辑' : '新建'}}
			</el-button>
		</cms-form>			
	</div>
</template>
<script>
	export default {
		name: 'Manager',
		data () {
			return {
				data: {},
				currentType: 1,
				// category
				form: {
				    type: {
				        type: 'radio',
				        name: '分类来源',
				        value: 1,
				        data: [{label: '积分商城', value: 1},{label: '会员商城', value: 2},],
				        placeholder: '',
				        disabled: false,
				        readonly: false,
				        required: true
				    },
				    name: {
				        type: 'text',
				        name: '分类名称',
				        value: '',
				        data: [],
				        placeholder: '请输入分类名称',
				        disabled: false,
				        readonly: false,
				        required: true
				    },

				    image: {
				    	type: 'upload',
				    	name: '分类图片',
				    	value: [],
				    	data: [],
				    	required: true,
				    	max: 1
				    },

				    level: {
				        type: 'radio',
				        name: '分类级别',
				        value: '',
				        data: [{label: '一级分类', value: 1},{label: '二级分类', value: 2},],
				        placeholder: '',
				        disabled: false,
				        readonly: false,
				        required: true
				    },

				    parentId: {
				    	type: 'select',
				    	name: '选择父级分类',
				    	value: '',
				    	placeholder: '请选择父级分类',
				    	data: [],
				    	show: false
				    },			    

				    orderNo: {
				    	type: 'number',
				    	name: '排序',
				    	value: '',
				    	required: true
				    }
				}
			}
		},
		mounted () {

			if (this.$route.query.isEdit) {
				try {
					this.data = JSON.parse(this.$route.query.data);
				} catch (e) {
					this.data = {};
				};			
			}

		},
		methods: {

			save () {
				let result = this.$refs.form.save();

				if (!result) {
					return;
				}

				result.image = result.image[0];

				let path = '';
				if (this.$route.query.isEdit) {
					path = 'admincategory/edit';
					result.id = this.data.id;
				} else {
					path = 'admincategory/add';
				}
				let params = result;

				this.$loading.show();
				wc.post({
					path: path,
					params: params
				}).then(res => {
					this.$loading.hide();
					if (res.code == 200) {
						this.$message({
							type: 'info',
							message: this.$route.query.isEdit ? '编辑成功' : '新建成功'
						})
						setTimeout(()=>{
							history.go(-1);
						}, 1000)
					}

					if (res.code == 402) {
						this.$message({
							type: 'info',
							message: res.msg
						});
					}

				}).catch(err => {
					this.$loading.hide();
				})
			}
		}
	}
</script>