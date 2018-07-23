<style lang="less" scoped>
</style>
<template>
	<div class="container">
		<el-button type="primary" @click="add" class="add-btn">新增分类</el-button>
<!-- 		<el-form :inline="true" :model="filterForm">
			<el-form-item label="手机号">
				<el-input v-model="formInline.phone" placeholder="输入手机号"></el-input>
			</el-form-item>
			<el-select v-model="filterForm.level" placeholder="分类级别">
				<el-option
					v-for="(item, key) in categoryList"
					:key="key"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
			<el-select v-model="filterForm.type" placeholder="分类来源">
				<el-option
					v-for="(item, key) in resourceList"
					:key="key"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
			<el-button type="primary" @click="filter">筛选</el-button>
		</el-form> -->
		<el-table border fit highlight-current-row :data="data.list" style="margin-top: 20px">
			<el-table-column 
				align="center"
				label="ID">
				<template scope="scope">
					{{scope.row.id}}
				</template>          
			</el-table-column>


			<el-table-column 
				align="center"
				label="名称">
				<template scope="scope">
					{{scope.row.name}}
				</template>          
			</el-table-column>


			<el-table-column
				width="200px" 
				align="center"
				label="分类图片">
				<template scope="scope">
					<a href="scope.row.image" target="_blank">
						<img :src="scope.row.image" alt="" class="img">
					</a>
				</template>          
			</el-table-column>


			<!-- ==================操作======================== -->
	        <el-table-column label="操作" align="center">
	            <template scope="scope">
	               <el-button type="primary" size="small" @click="up(scope.row)" v-show="scope.row.status == 0">上架</el-button>
	               <el-button type="primary" size="small" @click="down(scope.row)" v-show="scope.row.status == 1">下架</el-button>
	               <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
	               <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
	            </template>
	        </el-table-column>
		</el-table>
		<!-- 分页 -->
		<el-pagination
			class="pagination" 
			@current-change="skip"
			layout="total,prev, pager, next" 
			:total="data.total">
		</el-pagination>
	</div>
</template>
<script>
	export default {
		name: 'List',
		data () {
			return {
				data: {},
				offset: 1
			}
		},
		mounted () {
			this.fetchList();
		},
		methods: {
			fetchList () {
				// 显示loading
				this.$loading.show();
				let path = `admincategory/querypage/${this.offset}`;
				// 组合参数
				let params = {
				}
				wc.get({
					path: path,
					params: params
				}).then(res => {
					this.$loading.hide();
					if (res.code == 200) {
						this.data = res.data;
					}
				}).catch(err => {
					this.$loading.hide();
				});
			},
			add () {
				this.$router.push({
					path: '/category/manager'
				})
			},
			edit (row) {
				this.$router.push({
					path: '/category/manager',
					query: {
						isEdit: true,
						data: JSON.stringify(row)
					}
				});
			},
			up (row) {
				let path = `admincategory/up/${row.id}`;
				let params = {};
				this.$confirm('确认上架吗?', '提示', {
					confirmButtonText: '确定', 
					cancelButtonText: '取消', 
					type: 'warning'					
				}).then (res => {
					wc.get({
						path: path,
						params: params
					}).then(res => {
						if (res.code == 200) {
							this.$message({
								type: 'success',
								message: '操作成功'
							});
							this.fetchList();							
						}
					})
				}).catch(err => {
					this.$message({
						type: 'info',
						message: '操作已取消'
					});					
				});
			},
			/* 下架 */
			down (row) {
				let path = `admincategory/down/${row.id}`;
				let params = {};
				this.$confirm('确认下架吗?', '提示', {
					confirmButtonText: '确定', 
					cancelButtonText: '取消', 
					type: 'warning'					
				}).then (res => {
					wc.get({
						path: path,
						params: params
					}).then(res => {
						if (res.code == 200) {
							this.$message({
								type: 'success',
								message: '操作成功'
							});
							this.fetchList();							
						}
					})
				}).catch(err => {
					this.$message({
						type: 'info',
						message: '操作已取消'
					});					
				});
			},
			del (row) {
				let path = `admincategory/del/${row.id}`;
				let params = {};
				this.$confirm('确认删除吗?', '提示', {
					confirmButtonText: '确定', 
					cancelButtonText: '取消', 
					type: 'warning'					
				}).then (res => {
					wc.get({
						path: path,
						params: params
					}).then(res => {
						if (res.code == 200) {
							this.$message({
								type: 'success',
								message: '操作成功'
							});
							this.fetchList();						
						}
					})
				}).catch(err => {
					this.$message({
						type: 'info',
						message: '操作已取消'
					});					
				});
			},
			/* 分页跳转 */
			skip (index) {
				this.offset = index;
				this.fetchList();				
			},
			filter () {
				this.offset = 1;
				// 显示loading
				this.$loading.show();
				let path = `admincategory/querypage/${this.offset}`;
				// 组合参数
				let params = {
					condition: this.filterForm
				}
				wc.get({
					path: path,
					params: params
				}).then(res => {
					this.$loading.hide();
					if (res.code == 200) {
						this.data = res.data;
					}
				}).catch(err => {
					this.$loading.hide();
				});
			}
		}
	}
</script>